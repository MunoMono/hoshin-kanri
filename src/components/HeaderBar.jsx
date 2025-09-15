// src/components/HeaderBar.jsx
import React from "react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { Moon, Sun } from "@carbon/icons-react";

function HeaderBar({ theme, toggleTheme }) {
  const isDark = theme === "g90";
  const base = import.meta.env.BASE_URL || "/"; // ensures the name links home in dev & GH Pages

  return (
    <Header aria-label="Hoshin kanri">
      <HeaderName href={base} prefix="">
        Graham Newman hoshin kanri
      </HeaderName>

      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={toggleTheme}
          tooltipAlignment="end"
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}

export default HeaderBar;