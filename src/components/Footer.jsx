// src/components/Footer.jsx
import React from "react";
import { Theme, Grid, Column } from "@carbon/react";

export default function Footer({ height = 160 }) {
  return (
    <Theme theme="g90">
      <footer
        className="app-footer-fill"
        aria-label="Footer"
        style={{
          width: "100%",
          minHeight: height,
          margin: 0,                     // ← important
          background: "var(--cds-background)",
        }}
      >
        <Grid fullWidth condensed>
          <Column lg={16} md={8} sm={4}>
            {/* optional content */}
          </Column>
        </Grid>
      </footer>
    </Theme>
  );
}