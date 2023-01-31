import path from "path";
import fs from "fs";
import { parseMdx } from "../app/services/writings";
import { POST_CACHE_FILENAME } from "../app/services/writings.db";

const POST_DIR = path.join(__dirname, "..", "writings");
const POST_CACHE_DIR = path.join(__dirname, "..", "public");
const POST_CACHE_FILEPATH = path.join(POST_CACHE_DIR, POST_CACHE_FILENAME);

function readMdxFile(filename: string) {
  const slug = path.basename(filename, path.extname(filename));
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filename, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  }).then((content) => parseMdx(content, slug));
}

function isMarkdownFilename(filename: string | undefined) {
  return filename !== undefined && (filename.endsWith("md") || filename.endsWith("mdx"));
}

async function writePostCache() {
  const postFileNames = fs
    .readdirSync(POST_DIR)
    .filter(isMarkdownFilename)
    .map((name) => path.join(POST_DIR, name));
  const content = await Promise.all(postFileNames.map(readMdxFile));
  fs.writeFileSync(POST_CACHE_FILEPATH, JSON.stringify(content, null, 2));
  console.log("Wrote", path.relative(__dirname, POST_CACHE_FILEPATH));
}

(async () => {
  await writePostCache();
  if (process.env.NODE_ENV !== "production") {
    fs.watch(POST_DIR, (event, filename) => {
      if (isMarkdownFilename(filename)) {
        writePostCache();
      }
    });
  }
})();
