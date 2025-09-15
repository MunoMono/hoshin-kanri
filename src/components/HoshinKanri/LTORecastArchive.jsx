// src/components/HoshinKanri/LTORecastArchive.jsx

import React from "react";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import { renderCard, collectCards, aliasMap } from "./hoshinUtils";
import "../../styles/components/_hoshin-kanri.scss";

const LTORecastArchive = ({ data, renderInlineTargets }) => {
  const description = data.use_cases?.["lto-recast-archive"];

  const CARD_CHAIN = [
    "longtermobjective2",
    "longtermobjective3",
    "longtermobjective4",
    "prioritiesandactivities1",
    "prioritiesandactivities2",
    "prioritiesandactivities3",
    "prioritiesandactivities4",
    "prioritiesandactivities5",
    "ao14", // ✅ AO1.4
    "ao16", // ✅ AO1.6
    "kpi3",
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
      <h4 className="filter-heading">Filter: Long-term objectives recast archive</h4>
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

export default LTORecastArchive;