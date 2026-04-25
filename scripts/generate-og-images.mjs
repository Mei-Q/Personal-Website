import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const collections = ["posts", "papers", "projects", "tutorials"];
const contentRoot = path.join(root, "content");
const filesRoot = path.join(root, "public", "files");
const ogRoot = path.join(root, "public", "og");
const siteName = "Sweet Lemon Research Lab";
const siteDescription = "Research notes, papers, projects and tutorials";
const generatedOgNames = new Set();
const documentFilePattern = /\.(pdf|docx?|pptx?|xlsx?|csv|zip|rar|7z|txt|mdx?|tex|bib)$/i;

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function escapeXml(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugFromFile(fileName) {
  return path.basename(fileName).replace(/\.(md|mdx)$/i, "");
}

function slugFromDocumentFile(fileName) {
  return (
    path
      .basename(fileName, path.extname(fileName))
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9\u3400-\u9fff-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "download"
  );
}

function titleFromFile(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wrapText(input, max = 28, lines = 3) {
  const chars = Array.from(String(input));
  const result = [];
  let line = "";

  for (const char of chars) {
    line += char;
    const visualLength = Array.from(line).reduce((sum, value) => sum + (/[^\x00-\xff]/.test(value) ? 2 : 1), 0);
    if (visualLength >= max) {
      result.push(line.trim());
      line = "";
      if (result.length === lines) break;
    }
  }

  if (line.trim() && result.length < lines) result.push(line.trim());
  return result;
}

function renderSvg({ eyebrow, title, description }) {
  const titleLines = wrapText(title, 34, 3);
  const descriptionLines = wrapText(description, 54, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f8f6"/>
  <rect x="56" y="56" width="1088" height="518" rx="28" fill="#ffffff" stroke="#d8ded8"/>
  <circle cx="1040" cy="140" r="58" fill="#0f766e" opacity="0.12"/>
  <circle cx="980" cy="484" r="86" fill="#e11d48" opacity="0.10"/>
  <text x="96" y="126" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" fill="#0f766e">${escapeXml(eyebrow)}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="96" y="${220 + index * 72}" font-family="Inter, Arial, sans-serif" font-size="58" font-weight="800" fill="#17201b">${escapeXml(line)}</text>`
    )
    .join("\n  ")}
  ${descriptionLines
    .map(
      (line, index) =>
        `<text x="96" y="${458 + index * 38}" font-family="Inter, Arial, sans-serif" font-size="28" fill="#56635d">${escapeXml(line)}</text>`
    )
    .join("\n  ")}
  <text x="96" y="548" font-family="Inter, Arial, sans-serif" font-size="24" fill="#7a8580">${escapeXml(siteName)}</text>
</svg>`;
}

function writeOg(name, payload) {
  ensureDir(ogRoot);
  fs.writeFileSync(path.join(ogRoot, `${name}.svg`), renderSvg(payload), "utf8");
  generatedOgNames.add(name);
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

writeOg("site", {
  eyebrow: "Personal Research Lab",
  title: siteName,
  description: siteDescription
});

let count = 1;
for (const collection of collections) {
  const contentDir = path.join(contentRoot, collection);
  if (fs.existsSync(contentDir)) {
    for (const fileName of fs.readdirSync(contentDir)) {
      if (!/\.(md|mdx)$/i.test(fileName)) continue;
      const filePath = path.join(contentDir, fileName);
      const parsed = matter(fs.readFileSync(filePath, "utf8"));
      if (parsed.data.draft === true) continue;
      const slug = slugFromFile(fileName);
      writeOg(`${collection}-${slug}`, {
        eyebrow: collection.toUpperCase(),
        title: parsed.data.title ?? titleFromFile(fileName),
        description: parsed.data.description ?? siteDescription
      });
      count += 1;
    }
  }

  const filesDir = path.join(filesRoot, collection);
  if (!fs.existsSync(filesDir)) continue;
  const entries = fs.readdirSync(filesDir).filter((fileName) => documentFilePattern.test(fileName));
  const seen = new Set();
  for (const fileName of entries) {
    const slug = slugFromDocumentFile(fileName);
    if (seen.has(slug) || generatedOgNames.has(`${collection}-${slug}`)) continue;
    seen.add(slug);
    const metadata = readJsonIfExists(path.join(filesDir, `${path.basename(fileName, path.extname(fileName))}.json`));
    if (metadata.draft === true) continue;
    writeOg(`${collection}-${slug}`, {
      eyebrow: `${collection.toUpperCase()} DOWNLOAD`,
      title: metadata.title ?? titleFromFile(fileName),
      description: metadata.description ?? "Downloadable research resource"
    });
    count += 1;
  }
}

console.log(`Generated ${count} Open Graph image${count === 1 ? "" : "s"}.`);