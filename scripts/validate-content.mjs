import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const filesRoot = path.join(publicRoot, "files");
const collections = ["posts", "papers", "projects", "tutorials"];
const documentFilePattern = /\.(pdf|docx?|pptx?|xlsx?|csv|zip|rar|7z|txt)$/i;

const errors = [];
const warnings = [];

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readDirectory(directory) {
  if (!exists(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true });
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function pushIssue(list, filePath, message) {
  list.push(`${path.relative(root, filePath)}: ${message}`);
}

function validateStringArrayField(filePath, data, field) {
  const value = data[field];
  if (value === undefined) return;
  if (typeof value === "string") return;
  if (isStringArray(value)) return;
  pushIssue(errors, filePath, `frontmatter.${field} should be a string or string array.`);
}

function validateBooleanField(filePath, data, field) {
  const value = data[field];
  if (value === undefined || typeof value === "boolean") return;
  pushIssue(errors, filePath, `frontmatter.${field} should be true or false.`);
}

function validateLocalFileReference(filePath, href, fieldName) {
  if (!href.startsWith("/") || href.startsWith("//")) return;
  const target = path.join(publicRoot, href.replace(/^\//, ""));
  if (!exists(target)) {
    pushIssue(errors, filePath, `${fieldName} points to a missing public file: ${href}`);
  }
}

function validateDownloadEntries(filePath, entries, fieldName) {
  if (entries === undefined) return;
  const normalizedEntries = Array.isArray(entries) ? entries : [entries];

  for (const [index, entry] of normalizedEntries.entries()) {
    if (typeof entry === "string") {
      validateLocalFileReference(filePath, entry, `${fieldName}[${index}]`);
      continue;
    }

    if (!entry || typeof entry !== "object") {
      pushIssue(errors, filePath, `${fieldName}[${index}] should be a path string or an object.`);
      continue;
    }

    const href = entry.href ?? entry.url;
    if (typeof href !== "string" || !href.trim()) {
      pushIssue(errors, filePath, `${fieldName}[${index}] needs href or url.`);
      continue;
    }

    validateLocalFileReference(filePath, href, `${fieldName}[${index}].href`);
  }
}

function validateMarkdownFile(filePath, collection) {
  let parsed;
  try {
    parsed = matter(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    pushIssue(errors, filePath, `cannot parse frontmatter: ${error.message}`);
    return;
  }

  const data = parsed.data;
  if (!data.title || typeof data.title !== "string") {
    pushIssue(errors, filePath, "frontmatter.title is required and should be a string.");
  }

  if (!data.description || typeof data.description !== "string") {
    pushIssue(warnings, filePath, "frontmatter.description is recommended for lists, search, RSS and SEO.");
  }

  if (!data.date && !data.year) {
    pushIssue(warnings, filePath, "frontmatter.date or frontmatter.year is recommended for sorting.");
  }

  validateBooleanField(filePath, data, "draft");
  validateBooleanField(filePath, data, "featured");
  validateStringArrayField(filePath, data, "tags");
  validateStringArrayField(filePath, data, "categories");
  validateDownloadEntries(filePath, data.downloads, "downloads");
  validateDownloadEntries(filePath, data.attachments, "attachments");

  if (collection === "papers") {
    validateStringArrayField(filePath, data, "authors");
  }

  if (collection === "projects") {
    validateStringArrayField(filePath, data, "techStack");
  }
}

function validateDocumentMetadata(filePath) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    pushIssue(errors, filePath, `invalid JSON metadata: ${error.message}`);
    return;
  }

  if (data.title !== undefined && typeof data.title !== "string") {
    pushIssue(errors, filePath, "metadata.title should be a string.");
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    pushIssue(errors, filePath, "metadata.description should be a string.");
  }

  validateBooleanField(filePath, data, "draft");
  validateBooleanField(filePath, data, "featured");
  validateStringArrayField(filePath, data, "tags");
  validateStringArrayField(filePath, data, "categories");
  validateStringArrayField(filePath, data, "authors");
  validateStringArrayField(filePath, data, "techStack");
  validateDownloadEntries(filePath, data.downloads, "downloads");
  validateDownloadEntries(filePath, data.attachments, "attachments");
}

function validateCollection(collection) {
  const contentDirectory = path.join(contentRoot, collection);
  for (const entry of readDirectory(contentDirectory)) {
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      validateMarkdownFile(path.join(contentDirectory, entry.name), collection);
    }
  }

  const filesDirectory = path.join(filesRoot, collection);
  for (const entry of readDirectory(filesDirectory)) {
    const filePath = path.join(filesDirectory, entry.name);
    if (!entry.isFile() || entry.name === ".gitkeep") continue;

    if (entry.name.endsWith(".json")) {
      validateDocumentMetadata(filePath);
      const hasSiblingFile = readDirectory(filesDirectory).some(
        (candidate) =>
          candidate.isFile() &&
          candidate.name !== entry.name &&
          path.parse(candidate.name).name === path.parse(entry.name).name &&
          documentFilePattern.test(candidate.name)
      );
      if (!hasSiblingFile) {
        pushIssue(warnings, filePath, "metadata JSON has no same-name downloadable file.");
      }
      continue;
    }

    if (!documentFilePattern.test(entry.name)) {
      pushIssue(warnings, filePath, "file is not an auto-indexed downloadable format.");
    }
  }
}

for (const collection of collections) {
  validateCollection(collection);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

if (errors.length) {
  for (const error of errors) {
    console.error(`Error: ${error}`);
  }
  process.exit(1);
}

console.log(
  `Content validation passed with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`
);
