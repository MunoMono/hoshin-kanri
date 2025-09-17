# Hoshin Kanri

This project is an interactive **Hoshin Kanri matrix** built with React, Carbon Design System, and Webpack.  
It visualises the alignment between **long-term objectives, annual objectives, priorities & activities, and key performance indicators (KPIs)**.

---

## 📖 What is Hoshin Kanri?

**Hoshin Kanri** (also called policy management) is a strategic planning method used to ensure that the strategic goals of an organisation drive progress and action at every level.

In this project, the Hoshin matrix is implemented as a web app:

- **Long-term objectives (LTOs)**: the "North Star" strategic aims.  
- **Annual objectives (AOs)**: specific goals for the year.  
- **Priorities & activities (PAs)**: practical steps to achieve AOs.  
- **Key performance indicators (KPIs)**: measurable outcomes to track success.  

The app lets you browse these relationships interactively.

---

## 🖥️ Features

- **Matrix view**: Explore the four sections of the Hoshin Kanri.  
- **View selector**: Switch between matrix, cards, or detailed component views.  
- **Filter function**: Focus on a specific objective, activity, or KPI.  
- **Theme toggle**: Switch between light (g10) and dark (g90) Carbon themes.  

---

## 🚀 Running locally

Clone the repository:

```bash
git clone https://github.com/MunoMono/hoshin-kanri.git
cd hoshin-kanri
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

By default the app runs at:

```
http://localhost:5173
```

---

## 🌐 Deployment (GitHub Pages)

This project is configured to deploy on **GitHub Pages**.

Build the project:

```bash
npm run build
```

Push the `dist/` folder to GitHub Pages (this is automated if using GitHub Actions or `gh-pages`).

The app is live at:

👉 [https://munomono.github.io/hoshin-kanri/](https://munomono.github.io/hoshin-kanri/)

---

## 📂 Project structure

```
hoshin-kanri/
├── public/
│   └── data/hoshin-kanri/hoshin_kanri.json   # JSON data powering the app
├── src/
│   ├── components/                           # Header, Footer, Hoshin components
│   ├── pages/                                # Home page
│   ├── styles/                               # Global SCSS styling
│   ├── App.jsx
│   ├── main.jsx
│   └── webpack.config.js
└── README.md
```

---

## 📸 Screenshots

See `/docs` or repo issues for current UI screenshots.

---

## 📝 License

MIT License.  
Copyright (c) Graham Newman.
