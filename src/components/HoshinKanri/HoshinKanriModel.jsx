// src/components/HoshinKanri/HoshinKanriModel.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Column,
  Theme,
  Accordion,
  AccordionItem,
  Tooltip,
} from "@carbon/react";
import { Information } from "@carbon/icons-react";
import MenuControls from "./MenuControls";
import KPICard from "./KPICard";
import Yr1AnnualObjectivesCard from "./Yr1AnnualObjectivesCard";
import LongTermObjectivesCard from "./LongTermObjectivesCard";
import PrioritiesAndActivitiesCard from "./PrioritiesAndActivitiesCard";
import LTONorthStar from "./LTONorthStar";
import LTORecastArchive from "./LTORecastArchive";
import LTOAIInfrastructure from "./LTOAIInfrastructure";
import LTOMethodInnovation from "./LTOMethodInnovation";
import LTORecodeCanon from "./LTORecodeCanon";
import PADigitiseArchive from "./PADigitiseArchive";
import PACriticalInquiry from "./PACriticalInquiry";
import PAInteractivePlatform from "./PAInteractivePlatform";
import PAExpertInterviews from "./PAExpertInterviews";
import AOEquityAudit from "./AOEquityAudit";
import AOLiteratureReview from "./AOLiteratureReview";
import AOEthicsAccess from "./AOEthicsAccess";
import AOAnalysisPipeline from "./AOAnalysisPipeline";
import AOStakeholderInterviews from "./AOStakeholderInterviews";
import AOPrototypeTaxonomy from "./AOPrototypeTaxonomy";
import KPIPublications from "./KPIPublications";
import KPITaxonomyUsage from "./KPITaxonomyUsage";
import KPIInclusiveMetadata from "./KPIInclusiveMetadata";
import KPIInterviews from "./KPIInterviews";
import KPIDigitisation from "./KPIDigitisation";
import "../../styles/components/_hoshin-kanri.scss";

const HoshinKanriModel = () => {
  const [data, setData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedView, setView] = useState(null);
  const [selectedFilter, setFilter] = useState(null);

  const componentMap = {
    "lto-north-star": LTONorthStar,
    "lto-recast-archive": LTORecastArchive,
    "lto-ai-infrastructure": LTOAIInfrastructure,
    "lto-method-innovation": LTOMethodInnovation,
    "lto-recode-canon": LTORecodeCanon,

    "pa-digitise-archive": PADigitiseArchive,
    "pa-critical-inquiry": PACriticalInquiry,
    "pa-interactive-platform": PAInteractivePlatform,
    "pa-expert-interviews": PAExpertInterviews,

    "ao-equity-audit": AOEquityAudit,
    "ao-literature-review": AOLiteratureReview,
    "ao-ethics-access": AOEthicsAccess,
    "ao-analysis-pipeline": AOAnalysisPipeline,
    "ao-stakeholder-interviews": AOStakeholderInterviews,
    "ao-prototype-taxonomy": AOPrototypeTaxonomy,

    "kpi-publications": KPIPublications,
    "kpi-taxonomy-usage": KPITaxonomyUsage,
    "kpi-inclusive-metadata": KPIInclusiveMetadata,
    "kpi-interviews": KPIInterviews,
    "kpi-digitisation": KPIDigitisation,
  };

  // Load JSON with a path that works in dev (/) and on GitHub Pages (/hoshin-kanri/)
  useEffect(() => {
    const url = "data/hoshin-kanri/hoshin_kanri.json"; // relative to current base
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLastUpdated(new Date());
      })
      .catch((error) => {
        console.error("Error loading Hoshin JSON:", error);
      });
  }, []);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  const renderInlineTargets = (targets) =>
    targets?.map((target, index) => (
      <span key={index} className="map-target-inline">
        {target.id}
        {target.tooltip && target.trigger === "icon" && (
          <Tooltip
            label={target.tooltip}
            align="top"
            className="map-target-tooltip"
          >
            <Information className="tooltip-icon" />
          </Tooltip>
        )}
        {index < targets.length - 1 && (
          <span className="slash-divider"> / </span>
        )}
      </span>
    ));

  return (
    <Theme theme="g90">
      <div className="hoshin-kanri-model">
        {/* Filter controls */}
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <MenuControls
              selectedView={selectedView}
              setView={setView}
              selectedFilter={selectedFilter}
              setFilter={setFilter}
            />
          </Column>
        </Grid>

        {/* Card view: KPIs */}
        {selectedView?.id === "kpi-cards" ? (
          <>
            <h4 style={{ color: "#D47AA9", marginTop: "2rem" }}>
              Key performance indicators
            </h4>
            <Grid fullWidth className="kpi-card-grid">
              {data.kpis?.map((kpi) => (
                <Column lg={2} md={2} sm={1} key={kpi.id}>
                  <KPICard
                    title={`${kpi.title_prefix} ${kpi.title_snippet}`}
                    objective={kpi.objective}
                    kpq={kpi.kpq}
                    mapsTo={kpi.maps_to}
                    renderInlineTargets={renderInlineTargets}
                    target={kpi.target}
                    moderate={kpi.moderate}
                    risk={kpi.risk}
                  />
                </Column>
              ))}
            </Grid>
          </>
        ) : selectedView?.id === "ao-cards" ? (
          <>
            <h4 style={{ color: "#9E92EC", marginTop: "2rem" }}>
              Yr 1 annual objectives
            </h4>
            <Grid fullWidth className="kpi-card-grid">
              {data["annual_objectives"]?.["Year 1"]?.map((item) => (
                <Column lg={2} md={2} sm={1} key={item.id}>
                  <Yr1AnnualObjectivesCard
                    title_prefix={item.title_prefix}
                    objective={item.objective}
                    annotation={item.annotation}
                    measurement={item.maps_to_measurement?.[0]}
                    mapsTo={item.maps_to}
                    renderInlineTargets={renderInlineTargets}
                  />
                </Column>
              ))}
            </Grid>
          </>
        ) : selectedView?.id === "lto-cards" ? (
          <>
            <h4 style={{ color: "#5DA1B2", marginTop: "2rem" }}>
              Long-term objectives
            </h4>
            <Grid fullWidth className="kpi-card-grid">
              {data["long_term_objectives"]?.map((item) => (
                <Column lg={2} md={2} sm={1} key={item.id}>
                  <LongTermObjectivesCard
                    title={item.title_prefix}
                    objective={item.objective}
                    why={item.why}
                    how={item.how}
                    mapsTo={item.maps_to}
                    renderInlineTargets={renderInlineTargets}
                  />
                </Column>
              ))}
            </Grid>
          </>
        ) : selectedView?.id === "pa-cards" ? (
          <>
            <h4 style={{ color: "#CCB97E", marginTop: "2rem" }}>
              Priorities and activities
            </h4>
            <Grid fullWidth className="kpi-card-grid">
              {data["priorities_and_activities"]?.map((item) => (
                <Column lg={2} md={2} sm={1} key={item.id}>
                  <PrioritiesAndActivitiesCard
                    title={item.title_prefix}
                    objective={item.objective}
                    why={item.why}
                    how={item.how}
                    mapsTo={item.maps_to}
                    renderInlineTargets={renderInlineTargets}
                  />
                </Column>
              ))}
            </Grid>
          </>
        ) : selectedFilter?.id && componentMap[selectedFilter.id] ? (
          React.createElement(componentMap[selectedFilter.id], {
            data,
            renderInlineTargets,
          })
        ) : (
          <>
            {/* Default matrix layout */}
            <Grid>
              <Column lg={6} md={4} sm={4}>
                <section className="hoshin-section long-term">
                  <h4>Long-term objectives</h4>
                  <Accordion>
                    {data["long_term_objectives"]?.map((item) => (
                      <AccordionItem key={item.id} title={item.title_prefix}>
                        <div className="accordion-body">
                          <p>
                            <strong>Objective:</strong> {item.objective}
                          </p>
                          <p>
                            <strong>Why:</strong> {item.why}
                          </p>
                          <p>
                            <strong>How:</strong> {item.how}
                          </p>
                          <p>
                            <strong>Maps to:</strong>
                            <span className="maps-to-wrapper">
                              {renderInlineTargets(item.maps_to)}
                            </span>
                          </p>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </Column>

              <Column lg={6} md={4} sm={4}>
                <section className="hoshin-section priorities">
                  <h4>Priorities and activities</h4>
                  <Accordion>
                    {data["priorities_and_activities"]?.map((item) => (
                      <AccordionItem key={item.id} title={item.title_prefix}>
                        <div className="accordion-body">
                          <p>
                            <strong>Objective:</strong> {item.objective}
                          </p>
                          <p>
                            <strong>Why:</strong> {item.why}
                          </p>
                          <p>
                            <strong>How:</strong> {item.how}
                          </p>
                          <p>
                            <strong>Maps to:</strong>
                            <span className="maps-to-wrapper">
                              {renderInlineTargets(item.maps_to)}
                            </span>
                          </p>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </Column>

              <Column lg={6} md={4} sm={4}>
                <section className="hoshin-section annual1">
                  <h4>Yr 1 annual objectives</h4>
                  <Accordion>
                    {data["annual_objectives"]?.["Year 1"]?.map((item) => (
                      <AccordionItem key={item.id} title={item.title_prefix}>
                        <div className="accordion-body">
                          <p>
                            <strong>Objective:</strong> {item.objective}
                          </p>
                          <p>
                            <strong>Annotation:</strong> {item.annotation}
                          </p>
                          <p>
                            <strong>Maps to:</strong>
                            <span className="maps-to-wrapper">
                              {renderInlineTargets(item.maps_to)}
                            </span>
                          </p>
                          <p>
                            <strong>Measurement:</strong>{" "}
                            {item.maps_to_measurement?.[0]}
                          </p>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </Column>

              <Column lg={6} md={4} sm={4}>
                <section className="hoshin-section kpis">
                  <h4>Key performance indicators</h4>
                  <Accordion>
                    {data.kpis?.map((kpi) => (
                      <AccordionItem
                        key={kpi.id}
                        title={`${kpi.title_prefix} ${kpi.title_snippet}`}
                      >
                        <div className="accordion-body">
                          <p>
                            <strong>KPI:</strong> {kpi.objective}
                          </p>
                          <p>
                            <strong>KPQ:</strong> {kpi.kpq}
                          </p>
                          <p>
                            <strong>Maps to:</strong>
                            <span className="maps-to-wrapper">
                              {renderInlineTargets(kpi.maps_to)}
                            </span>
                          </p>
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </Column>
            </Grid>
          </>
        )}
      </div>
    </Theme>
  );
};

export default HoshinKanriModel;