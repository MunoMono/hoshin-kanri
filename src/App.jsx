// src/App.jsx
import React from "react";
import HoshinKanriModel from "./components/HoshinKanri/HoshinKanriModel.jsx";

export default function App() {
  return (
    <div style={{ padding: "12px" }}>
      <HoshinKanriModel dataUrl="/data/hoshin-kanri/hoshin_kanri.json" />
    </div>
  );
}