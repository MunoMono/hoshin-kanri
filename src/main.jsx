// src/main.jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const initialTheme = stored || (prefersDark ? "g90" : "g10");
document.documentElement.setAttribute("data-theme", initialTheme);

function Root() {
  const [theme, setTheme] = useState(initialTheme);
  const toggleTheme = () => {
    const next = theme === "g90" ? "g10" : "g90";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  };
  return <App theme={theme} toggleTheme={toggleTheme} />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);