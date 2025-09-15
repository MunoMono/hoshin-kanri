// src/pages/Home.jsx
import React, { useState } from "react";
import { Grid, Column } from "@carbon/react";
import HeaderBar from "../components/HeaderBar";
import SearchBox from "../components/SearchBox";
import HoshinKanriModel from "../components/HoshinKanri/HoshinKanriModel.jsx";

export default function Home() {
  const [query, setQuery] = useState("");

  // Base-relative path for JSON data (works locally and on GitHub Pages)
  const dataBaseUrl = `${import.meta.env.BASE_URL}data/hoshin-kanri/`;

  return (
    <>
      <HeaderBar />
      <Grid className="cds--grid cds--grid--narrow">
        <Column lg={12} md={8} sm={4}>
          <div className="home-search">
            <SearchBox query={query} setQuery={setQuery} />
          </div>

          {/* Render the Hoshin Kanri model.
              If it accepts props like query or dataUrl, pass them in here:
              <HoshinKanriModel query={query} dataUrl={`${dataBaseUrl}hoshin-kanri.json`} />
          */}
          <HoshinKanriModel />
        </Column>
      </Grid>
    </>
  );
}