import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function decodeXmlEntities(input: string) {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function normalizeExtractedText(input: string) {
  return input
    .replace(/\r/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function decodePdfLiteralString(input: string) {
  let output = "";
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (char !== "\\") {
      output += char;
      continue;
    }

    const next = input[++index];
    if (!next) break;
    if (next === "n") output += "\n";
    else if (next === "r") output += "\r";
    else if (next === "t") output += "\t";
    else if (next === "b") output += "\b";
    else if (next === "f") output += "\f";
    else if (["(", ")", "\\"].includes(next)) output += next;
    else if (/[0-7]/.test(next)) {
      let octal = next;
      for (let count = 0; count < 2 && /[0-7]/.test(input[index + 1] ?? ""); count += 1) {
        octal += input[++index];
      }
      output += String.fromCharCode(parseInt(octal, 8));
    } else {
      output += next;
    }
  }
  return output;
}

function decodePdfHexString(input: string) {
  const normalized = input.replace(/\s+/g, "");
  const bytes: number[] = [];
  for (let index = 0; index < normalized.length; index += 2) {
    bytes.push(parseInt(normalized.slice(index, index + 2).padEnd(2, "0"), 16));
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    let output = "";
    for (let index = 2; index + 1 < bytes.length; index += 2) {
      output += String.fromCharCode((bytes[index] << 8) + bytes[index + 1]);
    }
    return output;
  }

  const zeroBytes = bytes.filter((byte) => byte === 0).length;
  if (zeroBytes > bytes.length / 4) {
    let output = "";
    for (let index = 0; index + 1 < bytes.length; index += 2) {
      output += String.fromCharCode((bytes[index] << 8) + bytes[index + 1]);
    }
    return output;
  }

  return Buffer.from(bytes).toString("latin1");
}

function collectPdfStrings(content: string) {
  const parts: string[] = [];
  const literalPattern = /\(((?:\\.|[^\\)])*)\)\s*(?:Tj|'|")/g;
  const hexPattern = /<([0-9a-fA-F\s]+)>\s*(?:Tj|'|")/g;
  const arrayPattern = /\[((?:.|\n|\r)*?)\]\s*TJ/g;
  let match: RegExpExecArray | null;

  while ((match = literalPattern.exec(content))) {
    parts.push(decodePdfLiteralString(match[1]));
  }

  while ((match = hexPattern.exec(content))) {
    parts.push(decodePdfHexString(match[1]));
  }

  while ((match = arrayPattern.exec(content))) {
    const arrayContent = match[1];
    const tokenPattern = /\(((?:\\.|[^\\)])*)\)|<([0-9a-fA-F\s]+)>/g;
    let arrayMatch: RegExpExecArray | null;
    const lineParts: string[] = [];
    while ((arrayMatch = tokenPattern.exec(arrayContent))) {
      lineParts.push(
        arrayMatch[1] !== undefined
          ? decodePdfLiteralString(arrayMatch[1])
          : decodePdfHexString(arrayMatch[2])
      );
    }
    if (lineParts.length) parts.push(lineParts.join(""));
  }

  return parts.join("\n");
}

function extractPdfStreams(buffer: Buffer) {
  const source = buffer.toString("latin1");
  const outputs: string[] = [collectPdfStrings(source)];
  let cursor = 0;

  while (cursor < source.length) {
    const streamIndex = source.indexOf("stream", cursor);
    if (streamIndex === -1) break;
    const endIndex = source.indexOf("endstream", streamIndex);
    if (endIndex === -1) break;

    let dataStart = streamIndex + "stream".length;
    if (source[dataStart] === "\r" && source[dataStart + 1] === "\n") dataStart += 2;
    else if (source[dataStart] === "\n" || source[dataStart] === "\r") dataStart += 1;

    let dataEnd = endIndex;
    if (source[dataEnd - 2] === "\r" && source[dataEnd - 1] === "\n") dataEnd -= 2;
    else if (source[dataEnd - 1] === "\n" || source[dataEnd - 1] === "\r") dataEnd -= 1;

    const dictionary = source.slice(Math.max(0, streamIndex - 1200), streamIndex);
    const raw = buffer.subarray(dataStart, dataEnd);
    let decoded = raw;

    if (/\/FlateDecode\b/.test(dictionary)) {
      try {
        decoded = zlib.inflateSync(raw);
      } catch {
        try {
          decoded = zlib.inflateRawSync(raw);
        } catch {
          decoded = raw;
        }
      }
    }

    outputs.push(collectPdfStrings(decoded.toString("latin1")));
    cursor = endIndex + "endstream".length;
  }

  return outputs.join("\n");
}

export function extractPdfText(filePath: string) {
  try {
    return normalizeExtractedText(extractPdfStreams(fs.readFileSync(filePath)));
  } catch {
    return "";
  }
}

type ZipEntry = {
  name: string;
  compression: number;
  compressedSize: number;
  localHeaderOffset: number;
};

function findEndOfCentralDirectory(buffer: Buffer) {
  for (let offset = buffer.length - 22; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) return offset;
  }
  return -1;
}

function readZipEntries(buffer: Buffer): ZipEntry[] {
  const eocd = findEndOfCentralDirectory(buffer);
  if (eocd < 0) return [];

  const entryCount = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) break;
    const compression = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + fileNameLength).toString("utf8");
    entries.push({ name, compression, compressedSize, localHeaderOffset });
    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function readZipEntry(buffer: Buffer, entry: ZipEntry) {
  const offset = entry.localHeaderOffset;
  if (buffer.readUInt32LE(offset) !== 0x04034b50) return Buffer.alloc(0);
  const fileNameLength = buffer.readUInt16LE(offset + 26);
  const extraLength = buffer.readUInt16LE(offset + 28);
  const dataStart = offset + 30 + fileNameLength + extraLength;
  const compressed = buffer.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.compression === 0) return compressed;
  if (entry.compression === 8) {
    try {
      return zlib.inflateRawSync(compressed);
    } catch {
      return Buffer.alloc(0);
    }
  }

  return Buffer.alloc(0);
}

function extractTextFromWordXml(xml: string) {
  return normalizeExtractedText(
    decodeXmlEntities(
      xml
        .replace(/<w:tab\b[^>]*\/>/g, "\t")
        .replace(/<w:br\b[^>]*\/>/g, "\n")
        .replace(/<\/w:p>/g, "\n")
        .replace(/<\/w:tr>/g, "\n")
        .replace(/<[^>]+>/g, " ")
    )
  );
}

export function extractDocxText(filePath: string) {
  try {
    const buffer = fs.readFileSync(filePath);
    const entries = readZipEntries(buffer).filter((entry) =>
      /word\/(document|footnotes|endnotes|comments|header\d+|footer\d+)\.xml$/.test(entry.name)
    );
    return normalizeExtractedText(
      entries
        .map((entry) => extractTextFromWordXml(readZipEntry(buffer, entry).toString("utf8")))
        .filter(Boolean)
        .join("\n\n")
    );
  } catch {
    return "";
  }
}

export function extractPlainTextFile(filePath: string) {
  try {
    return normalizeExtractedText(fs.readFileSync(filePath, "utf8"));
  } catch {
    return "";
  }
}

export function extractDocumentText(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".pdf") return extractPdfText(filePath);
  if (extension === ".docx") return extractDocxText(filePath);
  if ([".txt", ".csv", ".md", ".mdx", ".json"].includes(extension)) {
    return extractPlainTextFile(filePath);
  }
  return "";
}