import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./TimelineCard.css";

class TimelineCard extends Component {
  render() {
    const {
      id,
      bodyContainerStyle,
      children,
      className,
      dateMarkerColor,
      dateText,
      dateTextColor,
      style
    } = this.props;
    return (
      <div
        id={id}
        className={classNames(className, "timeline-card", {
          "timeline-card-no-children": children === ""
        })}
        style={style}
      >
        <Fragment>
          <div className="title">
            <div>
              <span
                style={{ background: `${dateMarkerColor}` }}
                className="timeline-card-date"
              >
                <time
                  style={{ color: `${dateTextColor}` }}
                  className="timeline-card-dateinner"
                  title={dateText}
                >
                  {dateText}
                </time>
              </span>
            </div>
          </div>
          <div className="body">
            <div style={bodyContainerStyle}>{children}</div>
          </div>
        </Fragment>
      </div>
    );
  }
}

TimelineCard.propTypes = {
  id: PropTypes.string,
  bodyContainerStyle: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  dateMarkerColor: PropTypes.string,
  dateText: PropTypes.string,
  dateTextColor: PropTypes.string,
  style: PropTypes.shape({})
};

TimelineCard.defaultProps = {
  id: "",
  bodyContainerStyle: null,
  children: "",
  className: "",
  dateMarkerColor: "#9a9a9a",
  dateText: "",
  dateTextColor: "#f0f0f0",
  style: null
};

export default TimelineCard;
