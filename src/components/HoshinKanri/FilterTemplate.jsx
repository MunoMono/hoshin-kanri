import React from "react";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import "../../styles/components/_hoshin-kanri.scss";

// ✅ CHANGE THIS PER FILTER
const filterId = "lto-north-star"; // 🔁 Replace with actual ID like "pa-digitise-archive"
const CARD_CHAIN = [
  "longtermobjective1",
  "prioritiesandactivities1",
  "ao13",
  "ao14",
  "kpi1",
  "kpi3",
  "kpi10",
]; // 🔁 Replace with relevant card keys

const FilterTemplate = ({ data, renderInlineTargets }) => {
  const description = data.use_cases?.[filterId];

  const normalise = (str) =>
    str?.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  const aliasMap = {
    pa1: "prioritiesandactivities1",
    "3obtainethicalapprovalandformalaccesstothearchives": "yr1annualobjective3",
    "4initiatecomputationalanalysispipeline": "yr1annualobjective4",
  };

  const idMap = {};

  const collect = (arr = []) => {
    arr.forEach((item) => {
      const key = normalise(item.id);
      if (key) {
        idMap[key] = item;
        const alias = aliasMap[key];
        if (alias) {
          idMap[alias] = item;
        }
      }
    });
  };

  collect(data["long_term_objectives"]);
  collect(data["priorities_and_activities"]);
  collect(data.kpis);
  collect(data["annual_objectives"]?.["Year 1"]);

  const renderCard = (idKey) => {
    const item = idMap[idKey];
    if (!item) {
      console.warn(`Missing card data for ID key: ${idKey}`);
      return null;
    }

    const key = item.id;
    const idNorm = normalise(item.id);

    if (idNorm.startsWith("ao")) {
      const aoMatch = item.id.match(/^AO1\.(\d)$/);
      const aoNumber = aoMatch ? aoMatch[1] : "";
      const cleanTitle = item.title_prefix.replace(/^\d+\.\s*/, "");

      return (
        <div className="card-wrapper" key={key}>
          <Yr1AnnualObjectivesCard
            id={item.id}
            title_prefix={`Annual objective ${aoNumber}: ${cleanTitle}`}
            objective={item.objective}
            annotation={item.annotation}
            measurement={item.maps_to_measurement?.[0]}
            mapsTo={item.maps_to}
            renderInlineTargets={renderInlineTargets}
          />
        </div>
      );
    }

    if (
      idNorm.startsWith("prioritiesandactivities") ||
      idKey.startsWith("prioritiesandactivities")
    ) {
      const paNumber = item.id.replace(/\D+/g, "");
      const cleanTitle = item.title_prefix.replace(/^\d+\.\s*/, "");
      return (
        <div className="card-wrapper" key={key}>
          <PrioritiesAndActivitiesCard
            id={item.id}
            title={`Priorities and activities ${paNumber}: ${cleanTitle}`}
            objective={item.objective}
            why={item.why}
            how={item.how}
            mapsTo={item.maps_to}
            renderInlineTargets={renderInlineTargets}
          />
        </div>
      );
    }

    if (idNorm.startsWith("longtermobjective")) {
      return (
        <div className="card-wrapper" key={key}>
          <LongTermObjectivesCard
            id={item.id}
            title={`${item.id}: ${item.title_prefix.replace(/^\d+\.\s*/, "")}`}
            objective={item.objective}
            why={item.why}
            how={item.how}
            mapsTo={item.maps_to}
            renderInlineTargets={renderInlineTargets}
          />
        </div>
      );
    }

    if (idNorm.startsWith("kpi")) {
      return (
        <div className="card-wrapper" key={key}>
          <KPICard
            id={item.id}
            title={`${item.id}: ${item.title_snippet}`}
            objective={item.objective}
            kpq={item.kpq}
            mapsTo={
              <div className="maps-to-wrapper">
                {renderInlineTargets(item.maps_to)}
              </div>
            }
            target={item.target}
            moderate={item.moderate}
            risk={item.risk}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <h4 className="filter-heading">
        Filter: {filterId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h4>
      <p className="filter-description">{description}</p>

      <div className="filtered-card-container">
        {CARD_CHAIN.map((key) => renderCard(key))}
      </div>
    </>
  );
};

export default FilterTemplate;