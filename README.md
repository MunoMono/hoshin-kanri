# Reading Notes

A live, browsable **reading notes site** powered by **React, Vite, and IBM Carbon Design System**.  
Notes are generated from a BibTeX library, organised A–Z by author, and rendered as Markdown with metadata.

Live version: [https://munomono.github.io/reading-notes/](https://munomono.github.io/reading-notes/)

---

## 📚 About

This repository turns my Zotero-exported **BibTeX library** into a set of structured Markdown notes, grouped A–Z.  
Each note carries frontmatter metadata (`title`, `authors`, `year`, `doi`, etc.) and a `last_updated` timestamp.

- **Data source**: `refs/library.bib` (Better BibTeX export from Zotero)  
- **Framework**: React + Vite  
- **UI**: IBM Carbon Design System (`@carbon/react`, `@carbon/styles`)  
- **Features**:
  - A–Z navigation pills with counts
  - Clean entry list (authors, year, title, venue)
  - Search & filter across all metadata
  - Breadcrumb navigation in each note
  - Auto-stamped **last revision date** per note
  - Light/dark theme toggle
  - Deployable on GitHub Pages

---

## 🚀 Usage

### View online
[https://munomono.github.io/reading-notes/](https://munomono.github.io/reading-notes/)

### Run locally

```bash
git clone https://github.com/MunoMono/reading-notes.git
cd reading-notes
npm install
npm run dev:all
```

This runs both:
- the Vite dev server (`vite`)
- the watcher that **auto-updates `last_updated`** whenever you save a Markdown note.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📝 Workflow Cheatsheet

### 1. Create a new note

```bash
./scripts/newnote.sh <citekey|doi|url>
```

- Creates a new Markdown file in the correct A–Z folder.  
- Auto-fills frontmatter from `refs/library.bib`.  
- Immediately stamps `last_updated`.  

### 2. Develop locally (with live stamping)

```bash
npm run dev:all
```

- Starts dev server **and** auto-stamps on save.  
- Open [http://localhost:5173/reading-notes/](http://localhost:5173/reading-notes/)  

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

- Stamps all notes  
- Rebuilds `index.json`  
- Builds site into `dist/`  
- Publishes with `.nojekyll` to `gh-pages`

---

## 🛠 Development

Key source files:

- `src/App.jsx` — main app & router
- `src/pages/Home.jsx` — A–Z entry list & search
- `src/pages/Doc.jsx` — renders individual notes
- `scripts/newnote.sh` — creates new notes from `refs/library.bib`
- `scripts/stamp-notes.mjs` — manages `last_updated` stamping
- `scripts/build-docs-index.mjs` — rebuilds `public/docs/index.json`
- `src/styles/index.scss` — Carbon + global overrides

---

## 🔖 License

- Bibliographic **data**: [CC BY 4.0](./LICENSE-CC-BY-4.0.txt)  
- Application code + configs: [MIT](./LICENSE)  
