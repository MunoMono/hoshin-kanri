// src/pages/Home.jsx
import React from "react";
import HoshinKanriModel from "../components/HoshinKanri/HoshinKanriModel.jsx";

class DevErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = {error:null}; }
  static getDerivedStateFromError(e){ return {error:e}; }
  componentDidCatch(e, info){ console.error("Hoshin error:", e, info); }
  render(){
    if (this.state.error) {
      return <pre style={{color:"red",padding:16,whiteSpace:"pre-wrap"}}>
        {String(this.state.error?.stack || this.state.error)}
      </pre>;
    }
    return this.props.children;
  }
}

export default function Home() {
  const base = typeof BASE_URL !== "undefined" ? BASE_URL : "/";
  const dataUrl = `${base}data/hoshin-kanri/hoshin-kanri.json`;

  return (
    <div style={{ padding: 24 }}>
      <div style={{opacity:.6, marginBottom:12}}>Home loaded · base = {base}</div>
      <DevErrorBoundary>
        <HoshinKanriModel dataUrl={dataUrl} />
      </DevErrorBoundary>
    </div>
  );
}