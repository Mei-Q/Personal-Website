import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const collections = ["posts", "papers", "projects", "tutorials"];
const contentRoot = path.join(root, "content");
const filesRoot = path.join(root, "public", "files");

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function slugFromContentFile(fileName) {
  return path.basename(fileName).replace(/\.(md|mdx)$/i, "");
}

function shouldPublish(filePath) {
  try {
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    return parsed.data.draft !== true;
  } catch {
    return false;
  }
}

let count = 0;
for (const collection of collections) {
  const sourceDir = path.join(contentRoot, collection);
  const targetDir = path.join(filesRoot, collection);
  if (!fs.existsSync(sourceDir)) continue;
  ensureDir(targetDir);

  for (const fileName of fs.readdirSync(sourceDir)) {
    if (!/\.(md|mdx)$/i.test(fileName)) continue;
    const sourcePath = path.join(sourceDir, fileName);
    if (!shouldPublish(sourcePath)) continue;

    const extension = path.extname(fileName).toLowerCase();
    const targetPath = path.join(targetDir, `${slugFromContentFile(fileName)}${extension}`);
    fs.copyFileSync(sourcePath, targetPath);
    count += 1;
  }
}

console.log(`Exported ${count} content source file${count === 1 ? "" : "s"} to public/files.`);