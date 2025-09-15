// src/App.jsx
import React from "react";
import { Content } from "@carbon/react";
import HeaderBar from "./components/HeaderBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doc from "./pages/Doc";

function App({ toggleTheme, theme }) {
  return (
    <BrowserRouter basename="/hoshin-kanri">
      <HeaderBar theme={theme} toggleTheme={toggleTheme} />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/:letter/:slug" element={<Doc />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {/* Footer removed */}
      </Content>
    </BrowserRouter>
  );
}

export default App;