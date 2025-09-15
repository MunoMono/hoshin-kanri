// src/components/HoshinKanri/LTONorthStar.jsx

import React from "react";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import { renderCard, collectCards, aliasMap } from "./hoshinUtils";
import "../../styles/components/_hoshin-kanri.scss";

const LTONorthStar = ({ data, renderInlineTargets }) => {
  const description = data.use_cases?.["lto-north-star"];

  const CARD_CHAIN = [
    "longtermobjective1",
    "longtermobjective2",
    "longtermobjective3",
    "prioritiesandactivities1",
    "prioritiesandactivities2",
    "prioritiesandactivities3",
    "prioritiesandactivities4",
    "prioritiesandactivities5",
    "ao11", // ✅ AO1.1
    "ao12", // ✅ AO1.2
    "ao13", // ✅ AO1.3
    "ao14", // ✅ AO1.4
    "ao15", // ✅ AO1.5
    "ao16", // ✅ AO1.6
    "kpi1",
    "kpi2",
    "kpi3",
    "kpi10"
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
      <h4 className="filter-heading">Filter: Lto North Star</h4>
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

export default LTONorthStar;