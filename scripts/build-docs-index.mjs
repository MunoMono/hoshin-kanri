// scripts/build-docs-index.mjs
// Build public/docs/index.json from Markdown front-matter
// Run: npm run build:docs-index

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "public", "docs");
const OUT_FILE = path.join(DOCS_DIR, "index.json");

async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const items = await Promise.all(
    dirents.map(async (d) => {
      const p = path.join(dir, d.name);
      if (d.isDirectory()) return walk(p);
      return p;
    })
  );
  return items.flat();
}

// very light YAML parser for simple key: value pairs in the front-matter
function parseFrontmatter(mdText) {
  const m = mdText.match(/^---\s*([\s\S]*?)\s*---/);
  if (!m) return {};
  const yaml = m[1];
  const out = {};
  for (const line of yaml.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const mm = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!mm) continue;
    const key = mm[1].trim();
    let val = mm[2].trim();
    // keep bare numbers (e.g., year: 2020) as-is, otherwise strip quotes if present
    const isBareNumber = /^[0-9]+$/.test(val);
    if (!isBareNumber) {
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
    }
    out[key] = val;
  }
  return out;
}

function letterFromPath(absPath) {
  const parts = absPath.split(path.sep);
  const idx = parts.lastIndexOf("docs");
  return idx >= 0 && parts[idx + 1] ? parts[idx + 1] : "";
}

function toSlug(filename) {
  return filename.replace(/\.md$/i, "");
}

function buildDisplayTitle({ authors, year, title, journal, slug }) {
  // Authors (Year). Title — Journal
  const a = authors || "";
  const y = year || "";
  const t = title || slug;
  const j = journal || "";
  let s = "";
  if (a) s += a;
  if (y) s += (a ? " " : "") + `(${y})`;
  if (t) s += (a || y ? ". " : "") + t;
  if (j) s += ` — ${j}`;
  return s || slug;
}

async function main() {
  try {
    const all = await walk(DOCS_DIR);
    const mdFiles = all.filter((p) => p.toLowerCase().endsWith(".md"));
    const entries = [];

    for (const abs of mdFiles) {
      const relLetter = letterFromPath(abs);
      const filename = path.basename(abs);
      const slug = toSlug(filename);

      let fm = {};
      try {
        const raw = await fs.readFile(abs, "utf8");
        fm = parseFrontmatter(raw);
      } catch {
        fm = {};
      }

      const authors = fm.authors || "";
      const year = fm.year || "";
      const title = fm.title || "";
      const journal = fm.journal || fm.booktitle || "";
      const doi = fm.doi || "";
      const url = fm.url || "";
      const citation_key = fm.citation_key || slug;

      // file metadata (for "recently added")
      const stat = await fs.stat(abs).catch(() => null);
      const mtimeMs = stat?.mtimeMs ?? Date.now();

      const displayTitle = buildDisplayTitle({
        authors,
        year,
        title,
        journal,
        slug,
      });

      entries.push({
        letter: relLetter,
        slug,
        path: `/docs/${relLetter}/${slug}.md`,
        title,
        authors,
        year,
        journal,
        doi,
        url,
        citation_key,
        displayTitle,
        mtimeMs,
      });
    }

    // Sort: author asc, then year desc, then title asc
    entries.sort((a, b) => {
      const an = (a.authors || "").toLowerCase();
      const bn = (b.authors || "").toLowerCase();
      if (an !== bn) return an < bn ? -1 : 1;
      // numeric desc on year if possible
      const ay = parseInt(a.year, 10);
      const by = parseInt(b.year, 10);
      if (!Number.isNaN(ay) || !Number.isNaN(by)) {
        return (by || 0) - (ay || 0);
      }
      // fallback title asc
      return (a.title || "").localeCompare(b.title || "");
    });

    // Group A–Z
    const grouped = entries.reduce((acc, e) => {
      (acc[e.letter] ||= []).push(e);
      return acc;
    }, {});

    const out = {
      updatedAt: new Date().toISOString(),
      entries,
      grouped,
    };

    await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2));
    console.log(`Wrote ${OUT_FILE} with ${entries.length} entries.`);
  } catch (err) {
    console.error("Failed to build docs index:", err);
    process.exit(1);
  }
}

main();