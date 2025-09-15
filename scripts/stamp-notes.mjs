// scripts/stamp-notes.mjs
import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "public", "docs");

// Format like: "29 Aug 2025, 07:52"
function fmtDate(d) {
  const dt = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return dt.format(d);
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.endsWith(".md")) yield p;
  }
}

function updateFrontmatter(raw, stampLine) {
  const fmRe = /^---\s*([\s\S]*?)\s*---\s*\n?/;
  const m = raw.match(fmRe);

  if (m) {
    const fm = m[1];
    let newFm;
    if (/^last_updated\s*:/m.test(fm)) {
      newFm = fm.replace(/^last_updated\s*:.*/m, stampLine);
    } else {
      newFm = fm.trimEnd() + `\n${stampLine}\n`;
    }
    return raw.replace(fmRe, `---\n${newFm}---\n`);
  } else {
    return `---\n${stampLine}\n---\n\n${raw}`;
  }
}

async function stampOne(file) {
  const stat = await fs.stat(file);
  const stamp = fmtDate(stat.mtime);
  const stampLine = `last_updated: "${stamp}"`;

  const raw = await fs.readFile(file, "utf8");
  const updated = updateFrontmatter(raw, stampLine);
  if (updated !== raw) {
    await fs.writeFile(file, updated, "utf8");
    console.log("Stamped:", path.relative(ROOT, file));
    return true;
  }
  return false;
}

(async () => {
  const args = process.argv.slice(2).map((p) => path.resolve(p));
  let changed = 0;

  if (args.length) {
    for (const f of args) {
      try {
        const did = await stampOne(f);
        if (did) changed++;
      } catch (e) {
        // ignore non-existent files passed by watcher races
      }
    }
  } else {
    for await (const f of walk(DOCS_DIR)) {
      const did = await stampOne(f);
      if (did) changed++;
    }
  }
  console.log(`Stamped ${changed} file(s) using file mtimes.`);
})();