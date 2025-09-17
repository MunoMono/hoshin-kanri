// src/pages/Home.jsx
import React from "react";
import HeaderBar from "../components/HeaderBar.jsx";
import HoshinKanriModel from "../components/HoshinKanri/HoshinKanriModel.jsx";
import Footer from "../components/Footer.jsx";

class DevErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { error: null }; }
  static getDerivedStateFromError(e){ return { error: e }; }
  componentDidCatch(e, info){ console.error("Hoshin error:", e, info); }
  render(){
    if (this.state.error) {
      return (
        <pre style={{ color: "red", padding: 16, whiteSpace: "pre-wrap" }}>
          {String(this.state.error?.stack || this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}

export default function Home({ theme, toggleTheme }) {
  return (
    <div className="hoshin-kanri-page app-shell">
      {/* Fixed Carbon header */}
      <HeaderBar theme={theme} toggleTheme={toggleTheme} />
      {/* Spacer so content starts below the 48px header */}
      <div style={{ height: 48 }} aria-hidden="true" />
      <main className="app-main">
        <DevErrorBoundary>
          <HoshinKanriModel />
        </DevErrorBoundary>
      </main>
      <Footer height={200} />
    </div>
  );
}