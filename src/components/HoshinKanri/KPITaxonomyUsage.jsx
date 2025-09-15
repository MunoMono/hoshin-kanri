// src/components/HoshinKanri/KPITaxonomyUsage.jsx

import React from "react";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import { renderCard, collectCards, aliasMap } from "./hoshinUtils";
import "../../styles/components/_hoshin-kanri.scss";

const KPITaxonomyUsage = ({ data, renderInlineTargets }) => {
  const description = data.use_cases?.["kpi-taxonomy-usage"];

  const CARD_CHAIN = [
    "longtermobjective2",
    "longtermobjective3",
    "longtermobjective4",
    "longtermobjective5",
    "prioritiesandactivities1",
    "prioritiesandactivities3",
    "ao16", // ✅ AO1.6
    "kpi5",
    "kpi9"
  ];

  const idMap = collectCards(
    [
      data["long_term_objectives"],
      data["priorities_and_activities"],
      data.kpis,
      data["annual_objectives"]?.["Year 1"],
    ],
    aliasMap
  );

  return (
    <>
      <h4 className="filter-heading">Filter: KPI taxonomy usage</h4>
      <p className="filter-description">{description}</p>

      <div className="filtered-card-container">
        {CARD_CHAIN.map((key) => {
          const cardData = idMap[key];
          if (!cardData) {
            console.warn(`Missing card ID in idMap: ${key}`);
            return null;
          }
          return renderCard(cardData, renderInlineTargets, {
            KPICard,
            Yr1AnnualObjectivesCard,
            PrioritiesAndActivitiesCard,
            LongTermObjectivesCard,
          });
        })}
      </div>
    </>
  );
};

export default KPITaxonomyUsage;