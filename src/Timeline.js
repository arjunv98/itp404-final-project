import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Timeline.css";

const Timeline = ({ children, className, lineColor }) => (
  <div className="timeline-wrapper">
    <div
      className={classNames(className, "timeline")}
      style={{ color: `${lineColor}` }}
    >
      {children}
    </div>
  </div>
);

Timeline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  lineColor: PropTypes.string
};

Timeline.defaultProps = {
  className: "",
  lineColor: "#9a9a9a"
};

export default Timeline;
