// 🔠 Normalises ID strings for consistent comparison
export const normalise = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]/g, "").trim();

// 🧭 Central alias mapping for ID mismatches (expand as needed)
export const aliasMap = {
  // ✅ AO short aliases → canonical IDs (from "AO1.1" etc)
  ao1: "ao11",
  ao2: "ao12",
  ao3: "ao13",
  ao4: "ao14",
  ao5: "ao15",
  ao6: "ao16",

  // ✅ Priorities and activities aliases
  pa1: "prioritiesandactivities1",
  pa2: "prioritiesandactivities2",
  pa3: "prioritiesandactivities3",
  pa4: "prioritiesandactivities4",
  pa5: "prioritiesandactivities5",

  // Legacy string-based fallback
  "1completeliteraturereviewandlandscapemapping": "ao11",
  "2conductinitialequityauditofarchivalmetadataschemas": "ao12",
  "3obtainethicalapprovalandformalaccesstothearchives": "ao13",
  "4initiatecomputationalanalysispipeline": "ao14",
  "5conductinitialindepthinterviewswithstakeholders": "ao15",
  "6deployfirstversionofthetaxonomy": "ao16",
};

// 🗃️ Aggregates and maps ID-normalised entries across categories
export const collectCards = (dataSections = [], aliasMap = {}) => {
  const idMap = {};

  dataSections.forEach((section) => {
    (section || []).forEach((item) => {
      const key = normalise(item.id);
      if (key) {
        idMap[key] = item;

        // Also store under alias if it exists
        const alias = aliasMap[key];
        if (alias) {
          idMap[alias] = item;
        }
      }
    });
  });

  return idMap;
};

// 💳 Shared renderCard utility (used in filters)
export const renderCard = (item, renderInlineTargets, components = {}) => {
  const {
    KPICard,
    Yr1AnnualObjectivesCard,
    PrioritiesAndActivitiesCard,
    LongTermObjectivesCard,
  } = components;

  if (!item?.id) return null;

  const key = item.id;
  const idNorm = normalise(item.id);

  // ✅ Yr 1 Annual Objectives
  if (idNorm.startsWith("ao")) {
    const aoMatch = idNorm.match(/^ao(\d+)/);
    const aoNumber = aoMatch ? parseInt(aoMatch[1], 10) - 10 : "";
    const cleanTitle = item.title_prefix?.replace(/^\d+[.:]?\s*/, "") || "";

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

  // ✅ Priorities and Activities
  if (
    idNorm.startsWith("prioritiesandactivities") ||
    idNorm.startsWith("pa")
  ) {
    const paMatch = idNorm.match(/\d+/);
    const paNumber = paMatch ? paMatch[0] : "";
    const cleanTitle = item.title_prefix?.replace(/^\d+[.:]?\s*/, "") || "";

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

  // ✅ Long-term Objectives
  if (idNorm.startsWith("longtermobjective")) {
    const ltoMatch = idNorm.match(/\d+/);
    const ltoNumber = ltoMatch ? ltoMatch[0] : "";
    const cleanTitle = item.title_prefix?.replace(/^\d+[.:]?\s*/, "") || "";

    return (
      <div className="card-wrapper" key={key}>
        <LongTermObjectivesCard
          id={item.id}
          title={`Long-term objective ${ltoNumber}: ${cleanTitle}`}
          objective={item.objective}
          why={item.why}
          how={item.how}
          mapsTo={item.maps_to}
          renderInlineTargets={renderInlineTargets}
        />
      </div>
    );
  }

  // ✅ KPIs
  if (idNorm.startsWith("kpi")) {
    return (
      <div className="card-wrapper" key={key}>
        <KPICard
          id={item.id}
          title={`${item.id}: ${item.title_snippet}`}
          objective={item.objective}
          kpq={item.kpq}
          mapsTo={item.maps_to}
          target={item.target}
          moderate={item.moderate}
          risk={item.risk}
          renderInlineTargets={renderInlineTargets}
        />
      </div>
    );
  }

  return null;
};