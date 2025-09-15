// MenuControls.jsx
import React from "react";
import { Grid, Column, Dropdown, Button } from "@carbon/react";
import { ViewFilled, Filter } from "@carbon/icons-react";
import "../../styles/components/_hoshin-kanri.scss";

// Structural presentation options (View logic)
const viewItems = [
  { id: "matrix", text: "Matrix view–Full objective chain" },
  { id: "lto-cards", text: "Card view–Long-term objectives" },
  { id: "pa-cards", text: "Card view–Priorities and activities" },
  { id: "ao-cards", text: "Card view–Yr 1 annual objectives" },
  { id: "kpi-cards", text: "Card view–KPIs" },
];

// Semantic filters (Filter logic)
const filterItems = [
  { id: "header-lto", text: "—— Long-term objectives ——", disabled: true },
  { id: "lto-north-star", text: "LTO–North Star" },
  { id: "lto-recast-archive", text: "LTO–recast archive" },
  { id: "lto-ai-infrastructure", text: "LTO–AI infrastructure" },
  { id: "lto-method-innovation", text: "LTO–method innovation" },
  { id: "lto-recode-canon", text: "LTO–recode the canon" },

  { id: "header-pa", text: "—— Priorities and Activities ——", disabled: true },
  { id: "pa-digitise-archive", text: "PA–digitise archive" },
  { id: "pa-critical-inquiry", text: "PA–critical inquiry" },
  { id: "pa-interactive-platform", text: "PA–interactive platform" },
  { id: "pa-expert-interviews", text: "PA–expert interviews" },

  { id: "header-ao", text: "—— Annual Objectives ——", disabled: true },
  { id: "ao-equity-audit", text: "AO–equity audit" },
  { id: "ao-literature-review", text: "AO–literature review" },
  { id: "ao-ethics-access", text: "AO–ethics + access" },
  { id: "ao-analysis-pipeline", text: "AO–analysis pipeline" },
  { id: "ao-stakeholder-interviews", text: "AO–stakeholder interviews" },
  { id: "ao-prototype-taxonomy", text: "AO–prototype taxonomy" },

  { id: "header-kpi", text: "—— KPIs ——", disabled: true },
  { id: "kpi-publications", text: "KPI–publication outputs" },
  { id: "kpi-taxonomy-usage", text: "KPI–taxonomy usability" },
  { id: "kpi-inclusive-metadata", text: "KPI–inclusive metadata" },
  { id: "kpi-interviews", text: "KPI–stakeholder interviews" },
  { id: "kpi-digitisation", text: "KPI–digitisation progress" },
];

const MenuControls = ({ selectedView, setView, selectedFilter, setFilter }) => {
  const handleReset = () => {
    setView(null);
    setFilter(null);
  };

  return (
    <div className="menu-controls">
      <Grid condensed fullWidth className="filter-dropdown-row">
        <Column lg={5} md={4} sm={2}>
          <Dropdown
            id="view-dropdown"
            label={
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ViewFilled size={16} /> Choose a view
              </span>
            }
            items={viewItems}
            selectedItem={selectedView}
            onChange={({ selectedItem }) => setView(selectedItem)}
            itemToString={(item) => (item ? item.text : "")}
            style={{ maxWidth: "20rem" }}
          />
        </Column>
        <Column lg={5} md={4} sm={2}>
          <Dropdown
            id="filter-dropdown"
            label={
              selectedFilter ? selectedFilter.text : (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Filter size={16} /> Apply a filter
                </span>
              )
            }
            items={filterItems}
            selectedItem={selectedFilter}
            onChange={({ selectedItem }) => setFilter(selectedItem)}
            itemToElement={(item) =>
              item.disabled ? (
                <div className="dropdown-header">{item.text}</div>
              ) : (
                <span>{item.text}</span>
              )
            }
            itemToString={(item) => (item ? item.text : "")}
            style={{ maxWidth: "20rem" }}
          />
        </Column>
        <Column lg={5} md={4} sm={2} className="filter-reset">
          <div className="reset-button-wrapper">
            <Button kind="tertiary" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default MenuControls;