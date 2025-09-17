// src/App.jsx
import React from "react";
import Home from "./pages/Home.jsx";

export default function App({ theme, toggleTheme }) {
  return <Home theme={theme} toggleTheme={toggleTheme} />;
}