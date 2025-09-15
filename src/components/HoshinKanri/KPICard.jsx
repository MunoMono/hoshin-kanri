//KPICard.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/_hoshin-kanri.scss";

const KPICard = ({
  title,
  objective,
  kpq,
  mapsTo,
  renderInlineTargets,
  target,
  moderate,
  risk,
}) => {
  const hasThresholds = target || moderate || risk;

  return (
    <div className="kpi-card">
      <h5 className="kpi-title">{title}</h5>
      <p>
        <strong>KPI:</strong> {objective}
      </p>
      <p>
        <strong>KPQ:</strong> {kpq}
      </p>
      <p>
        <strong>Maps to:</strong>{" "}
        <span className="maps-to-wrapper">{renderInlineTargets(mapsTo)}</span>
      </p>

      {hasThresholds && (
        <div className="kpi-thresholds">
          {target && (
            <p>
              <strong>Target:</strong> {target}
            </p>
          )}
          {moderate && (
            <p>
              <strong>Moderate:</strong> {moderate}
            </p>
          )}
          {risk && (
            <p>
              <strong>Risk:</strong> {risk}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

KPICard.propTypes = {
  title: PropTypes.string.isRequired,
  objective: PropTypes.string.isRequired,
  kpq: PropTypes.string.isRequired,
  mapsTo: PropTypes.array,
  renderInlineTargets: PropTypes.func.isRequired,
  target: PropTypes.string,
  moderate: PropTypes.string,
  risk: PropTypes.string,
};

export default KPICard;
