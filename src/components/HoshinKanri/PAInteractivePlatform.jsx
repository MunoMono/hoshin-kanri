// src/components/HoshinKanri/PAInteractivePlatform.jsx

import React from "react";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import { renderCard, collectCards, aliasMap } from "./hoshinUtils";
import "../../styles/components/_hoshin-kanri.scss";

const PAInteractivePlatform = ({ data, renderInlineTargets }) => {
  const description = data.use_cases?.["pa-interactive-platform"];

  const CARD_CHAIN = [
    "longtermobjective2",
    "longtermobjective3",
    "longtermobjective4",
    "longtermobjective5",
    "prioritiesandactivities1",
    "prioritiesandactivities2",
    "prioritiesandactivities3",
    "prioritiesandactivities5",
    "ao16", // ✅ AO1.6
    "kpi1",
    "kpi2",
    "kpi3",
    "kpi4",
    "kpi5",
    "kpi6",
    "kpi7",
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
      <h4 className="filter-heading">Filter: Priorities and activities interactive platform</h4>
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

export default PAInteractivePlatform;