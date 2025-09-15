// PrioritiesAndActivitiesCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/_hoshin-kanri.scss";

const PrioritiesAndActivitiesCard = ({
  title,
  objective,
  why,
  how,
  mapsTo,
  renderInlineTargets,
}) => {
  return (
    <div className="priorities-and-activities-card">
      <h5 className="pa-title">{title}</h5>
      <p><strong>Objective:</strong> {objective}</p>
      <p><strong>Why:</strong> {why}</p>
      <p><strong>How:</strong> {how}</p>
      <p>
        <strong>Maps to:</strong>{" "}
        <span className="maps-to-wrapper">{renderInlineTargets(mapsTo)}</span>
      </p>
    </div>
  );
};

PrioritiesAndActivitiesCard.propTypes = {
  title: PropTypes.string.isRequired,
  objective: PropTypes.string.isRequired,
  why: PropTypes.string.isRequired,
  how: PropTypes.string.isRequired,
  mapsTo: PropTypes.array,
  renderInlineTargets: PropTypes.func.isRequired,
};

export default PrioritiesAndActivitiesCard;