//Yr1AnnualObjectivesCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/_hoshin-kanri.scss";

const Yr1AnnualObjectivesCard = ({
  title_prefix,
  objective,
  annotation,
  mapsTo,
  measurement,
  renderInlineTargets,
}) => {
  return (
    <div className="yr-1-annual-objectives-card">
      <h5 className="annual-objective-title">{title_prefix}</h5>
      <p><strong>Objective:</strong> {objective}</p>
      <p><strong>Annotation:</strong> {annotation}</p>
      <p>
        <strong>Maps to:</strong>{" "}
        <span className="maps-to-wrapper">{renderInlineTargets(mapsTo)}</span>
      </p>
      {measurement && (
        <p><strong>Measurement:</strong> {measurement}</p>
      )}
    </div>
  );
};

Yr1AnnualObjectivesCard.propTypes = {
  title_prefix: PropTypes.string.isRequired,
  objective: PropTypes.string.isRequired,
  annotation: PropTypes.string.isRequired,
  mapsTo: PropTypes.array,
  measurement: PropTypes.string,
  renderInlineTargets: PropTypes.func.isRequired,
};

export default Yr1AnnualObjectivesCard;