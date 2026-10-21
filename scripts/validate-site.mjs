import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(new URL("../", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const files = [];
async function walk(dir) {
  for (const name of await readdir(dir)) {
    if ([".git", "node_modules"].includes(name)) continue;
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) await walk(path);
    else if (path.endsWith(".html") && !name.startsWith("google")) files.push(path);
  }
}
await walk(root);
const errors = [];
for (const file of files) {
  const html = await readFile(file, "utf8");
  if ((html.match(/<h1[ >]/g) ?? []).length !== 1) errors.push(`${file}: expected one primary heading`);
  for (const [, src] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    try { await stat(join(root, src)); } catch { errors.push(`${file}: missing asset ${src}`); }
  }
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${anchor}"`)) errors.push(`${file}: missing anchor ${anchor}`);
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(img)) errors.push(`${file}: image needs alt text`);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { errors.push(`${file}: invalid structured data`); }
  }
  for (const required of ['lang="en-US"', '<meta name="description"', '<link rel="canonical"', 'id="content"']) {
    if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
  }
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean || ["/assets/style.css", "/assets/logo.svg"].includes(clean)) continue;
    const target = clean.endsWith("/") ? join(root, clean, "index.html") : join(root, `${clean}.html`);
    try { await stat(target); } catch { errors.push(`${file}: broken link ${href}`); }
  }
}
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
if ((sitemap.match(/<url>/g) ?? []).length !== files.length) errors.push("sitemap URL count must match HTML page count");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Validated ${files.length} HTML files, internal links, metadata, and sitemap URLs.`);
