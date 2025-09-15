import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Column, Tag } from "@carbon/react";
import SearchBox from "../components/SearchBox";

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text, query) {
  if (!query?.trim() || !text) return text;
  const re = new RegExp(`(${escapeRegExp(query.trim())})`, "gi");
  const parts = String(text).split(re);
  return parts.map((part, i) =>
    re.test(part) ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

export default function Home() {
  const [data, setData] = useState({ entries: [], grouped: {}, updatedAt: null });
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/reading-notes/docs/index.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => setData(json))
      .catch((e) => console.error("Failed to load /docs/index.json", e));
  }, []);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filteredEntries = useMemo(() => {
    if (!query.trim()) return data.entries || [];
    const q = query.toLowerCase();
    return (data.entries || []).filter((e) =>
      [e.title, e.authors, e.venue, e.year, e.doi]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data.entries, query]);

  const filteredGrouped = useMemo(() => {
    return filteredEntries.reduce((acc, e) => {
      (acc[e.letter] ||= []).push(e);
      return acc;
    }, {});
  }, [filteredEntries]);

  const total = filteredEntries.length;
  const lastUpdated = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Grid className="cds--grid cds--grid--narrow">
      <Column lg={12} md={8} sm={4}>
        <h2 className="home-heading">Reading notes</h2>
        <p className="cds--type-helper-text home-meta">
          {total} entries · from <code>public/docs</code>
          {lastUpdated ? <> · updated {lastUpdated}</> : null}
        </p>

        <div className="home-search">
          <SearchBox query={query} setQuery={setQuery} />
        </div>

        <div className="pill-row">
          {letters.map((L) => (
            <a className="pill" key={L} href={`#${L}`}>
              {L} <Tag type="gray">{(filteredGrouped[L] || []).length}</Tag>
            </a>
          ))}
        </div>

        {letters.map((L) => {
          const items = filteredGrouped[L] || [];
          if (!items.length) return null;
          return (
            <section key={L} id={L} className="alpha-section">
              <h3>{L}</h3>
              <ul className="entry-list">
                {items.map((e) => (
                  <li key={`${e.letter}/${e.slug}`}>
                    <Link to={`/docs/${e.letter}/${e.slug}`}>
                      <strong>{highlight(e.authors, query)}</strong>
                      {e.year ? <> ({highlight(e.year, query)})</> : null}.{" "}
                      {highlight(e.title, query)}
                      {e.venue ? <em> — {highlight(e.venue, query)}</em> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Column>
    </Grid>
  );
}