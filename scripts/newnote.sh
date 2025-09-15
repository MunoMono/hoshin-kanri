#!/usr/bin/env bash
# Create a new reading note from a citekey, DOI or URL using the project template.
set -euo pipefail
umask 022

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <citekey|doi|url> [--build]" >&2
  exit 1
fi

IDENT="$1"; shift || true
DO_BUILD=0
[[ "${1:-}" == "--build" ]] && DO_BUILD=1

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CSL_STYLE="${CSL_STYLE:-https://www.zotero.org/styles/harvard-cite-them-right}"
BIB_PATH="${BIB:-${BIBLIOGRAPHY:-refs/library.bib}}"
NOTES_DIR="${NOTES_DIR:-public/docs}"   # <- ensure we write into public/docs by default
mkdir -p "$NOTES_DIR"

command -v python3 >/dev/null 2>&1 || { echo "Error: python3 not found"; exit 1; }
[[ -f "$BIB_PATH" ]] || { echo "Error: bibliography not found: $BIB_PATH" >&2; exit 1; }

# Run the Python generator and CAPTURE the output path
NEWFILE=$(python3 - "$BIB_PATH" "$NOTES_DIR" "$IDENT" "$CSL_STYLE" <<'PY'
import re, sys, pathlib, datetime
from zoneinfo import ZoneInfo

bib_path = pathlib.Path(sys.argv[1])
notes_dir = pathlib.Path(sys.argv[2])
ident     = sys.argv[3]
csl_style = sys.argv[4]

def norm(s):
    return re.sub(r'[^a-z0-9]+','', (s or '').lower())

def load_bib_entries(path):
    txt = path.read_text(encoding='utf-8', errors='ignore')
    chunks = re.split(r'(?m)^(?=@)', txt)
    entries=[]
    for ch in chunks:
        m = re.match(r'@\s*([^{(]+)\s*[\{\(]\s*([^,\s]+)', ch)
        if not m:
            continue
        key = m.group(2).strip()
        fields={}
        for fm in re.finditer(
            r'([a-zA-Z]+)\s*=\s*'
            r'(?:'
            r'({(?:[^{}]|{[^}]*})*})'   # braced
            r'|("([^"]*)")'             # quoted
            r'|([^\s,]+)'               # bare
            r')\s*,?', ch, re.S):
            name = fm.group(1).lower()
            if fm.group(2):
                raw = fm.group(2)[1:-1]
            elif fm.group(3):
                raw = fm.group(4) or ""
            else:
                raw = fm.group(5) or ""
            fields[name] = raw.strip()
        entries.append((key, fields))
    return entries

entries = load_bib_entries(bib_path)
by_key = {k:(k,f) for k,f in entries}
by_doi = {norm(f.get('doi','')):(k,f) for k,f in entries if f.get('doi')}
by_url = {norm(f.get('url','')):(k,f) for k,f in entries if f.get('url')}

key_like = ident.lstrip('@')
found = by_key.get(key_like)
if not found:
    idn = norm(ident)
    if '/' in ident or ident.startswith('10.'):
        found = by_doi.get(idn) or by_url.get(idn)

if found:
    citekey, f = found
    title   = f.get('title','').strip()
    authors = f.get('author','').strip()
    year    = re.sub(r'\D+','', f.get('year','')).strip() or ""
    journal = f.get('journal','') or f.get('booktitle','') or f.get('publisher','')
    doi     = f.get('doi','')
    url     = f.get('url','')
else:
    citekey = key_like if key_like else norm(ident)[:32] or "unknown"
    title   = "<Paper title here>"
    authors = "<Authors here>"
    year    = "<Year>"
    journal = "<Journal name>"
    doi     = ident if ident.startswith('10.') else ""
    url     = ident if ident.startswith('http') else ""

def yaml_str(s):
    s = (s or "").replace('"', '\\"')
    return f'"{s}"'

# Determine letter subfolder (first author surname initial if available)
first_author = authors.split(',')[0].strip() if authors else ''
letter = (first_author[:1].upper() or citekey[:1].upper() or 'Z')
if not letter.isalpha():
    letter = 'Z'

outdir = notes_dir / letter
outdir.mkdir(parents=True, exist_ok=True)

fname = re.sub(r'[^A-Za-z0-9._-]+', '-', citekey) + ".md"
out = outdir / fname

# Format last_updated as "03 Sept 2025, 13:15" in Europe/London
now = datetime.datetime.now(ZoneInfo("Europe/London"))
# Custom month map to force "Sept"
mon_map = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sept",10:"Oct",11:"Nov",12:"Dec"}
last_updated = f'{now.day:02d} {mon_map[now.month]} {now.year}, {now.hour:02d}:{now.minute:02d}'

if not out.exists():
    tpl = f"""---
title: {yaml_str(title)}
authors: {yaml_str(authors)}
year: {year or ''}
journal: {yaml_str(journal)}
citation_key: {citekey}
doi: {yaml_str(doi)}
url: {yaml_str(url)}
bibliography: ../../refs/library.bib
csl: "{csl_style}"
link-citations: true
last_updated: "{last_updated}"
---

# Scope of this note
<!-- Optional: one or two lines stating which chapters/sections this note focuses on and how it integrates with the project spine. -->

## Purpose and aim
### What research question or objective is being addressed?

## Methodology
### Describe the research design, methods and sample size.

## Key findings and arguments
### Summarise the main results and conclusions
1. 
2. 
3. 

## Relevance
### How does it link to the research questions or framework?

## Project integration
### Why it helps the project (evidence-linked)
- What concrete evidence from the paper strengthens the project? Cite inline (for example, ``[@{citekey}]``) and add page references for specifics.

### Hooks into the project
- **Workstreams →** 
- **Deliverables →** 
- **Stakeholders →** 

### Use across the methods spine
- [ ] Framing and theory
- [ ] Study design
- [ ] Data collection and instruments
- [ ] Analysis and models
- [ ] Synthesis and interpretation
- [ ] Reporting and communications

## Critical evaluation
### Strengths
- What is robust here?
- Any novel contributions?

### Weaknesses and limitations
- Flaws, gaps or biases?
- Anything the study overlooks?

### Author’s credibility
- Credentials, affiliations, track record?

### Contextual validity
- Does it generalise beyond the sample or context studied?

### Comparisons
- How does it align or conflict with other studies?

## Interpretation
### Analysis and insights
- Alternative explanations?
- Implications for practice, policy or theory?
- How does it shape your thinking?

## Evidence to quote or paraphrase
- '<Quote>' (page X)
- **Paraphrase:** <Your paraphrase of a key passage> (page X)

## Related works
- List directly cited or conceptually linked papers.

## Questions for further research
- What unanswered questions remain?
- What should you follow up next?
"""
    out.write_text(tpl, encoding="utf-8")

print(str(out))  # <-- print created (or existing) file path
PY
)

echo "$NEWFILE"

# Immediately stamp THIS ONE file from its mtime
node scripts/stamp-notes.mjs "$NEWFILE" || true

# Rebuild index optionally when --build is passed
if [[ $DO_BUILD -eq 1 ]]; then
  npm run build:docs-index
fi