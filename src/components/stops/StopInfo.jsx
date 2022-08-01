import React from "react";
import PropTypes from "prop-types";

const StopInfo = ({ arrivingIn, trip, headsign, day, time }) => {
  return (
    <div className="stop-info">
      <div className="line-name">{headsign ?? "Not Available"}</div>
      <div className="route">{trip.route.longName}</div>
      <div className="mode-day-time">
        <div className="mode">
          <img
            className="mode-icon"
            src={`/icons/${trip.route.mode}.jpg`}
            alt={trip.route.mode}
          />
          {trip.route.shortName}
        </div>
        <div className="day-time">
          <div className="day">{day}</div>
          <div className="time">
            {"Scheduled time: "}
            {time}
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="arrivingIn">Arriving In {arrivingIn} minutes</div>
    </div>
  );
};

export default StopInfo;

StopInfo.protoTypes = {
  arrivingIn: PropTypes.string,
  trip: PropTypes.object,
  headsign: PropTypes.string,
  day: PropTypes.string,
  time: PropTypes.string,
};
