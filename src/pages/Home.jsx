// src/pages/Home.jsx
import React, { useState } from "react";
import { Grid, Column } from "@carbon/react";
import SearchBox from "../components/SearchBox";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <Grid className="cds--grid cds--grid--narrow">
      <Column lg={12} md={8} sm={4}>
        <div className="home-search">
          <SearchBox query={query} setQuery={setQuery} />
        </div>
      </Column>
    </Grid>
  );
}