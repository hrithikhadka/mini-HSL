import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchingData, fetchingFailed, fetchingSuccess } from "../../actions";
import { BsArrowRepeat } from "react-icons/bs";
import StopInfo from "./StopInfo";
import "./stops.css";
import SearchBar from "./SearchBar";

const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

const Stops = (props) => {
  const { stops, fetchData, fetchFailed, fetchSuccess } = props;
  const { data, loading, error } = stops;

  const [searchedStopId, setSearchedStopId] = useState("HSL:1020453");

  const query = `{
  stop(id: "${searchedStopId}") {
   name
   	stoptimesWithoutPatterns(numberOfDepartures:10) {
       scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
        
        trip {
          route{
            mode
            type
            id
            shortName
            longName
            agency {
              name
            }
          }
          wheelchairAccessible
          bikesAllowed
        }
        
      } 
  }  
}`;
  const subscriptionKey = process.env.REACT_APP_DIGITRANSIT_SUBSCRIPTION_KEY;

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "digitransit-subscription-key": subscriptionKey,
    },
    body: JSON.stringify({
      query,
    }),
  };

  const handleSearchId = (stopId) => {
    setSearchedStopId(stopId);
    getData(stopId);
  };

  const getData = (stopId) => {
    fetchData();
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => fetchSuccess(data))
      .catch((e) => fetchFailed(e.message));
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshFetchData = () => {
    getData();
  };

  return (
    <div className="container">
      {error && <span>{error}</span>}
      {loading && <span>Loading ...</span>}
      <SearchBar onSearch={handleSearchId} />
      <div className="arrivals">
        <h3 className="station">{data?.name}</h3>
        <button className="refresh-data" onClick={refreshFetchData}>
          Refresh <BsArrowRepeat />
        </button>

        {data?.stoptimesWithoutPatterns?.map(
          ({ headsign, serviceDay, scheduledArrival, trip }, index) => {
            const dateOfArrival = new Date(
              (serviceDay + scheduledArrival) * 1000
            );

            const day = dateOfArrival.toLocaleDateString("en", {
              day: "2-digit",
              month: "short",
            });

            const time = dateOfArrival.toLocaleTimeString("en", {
              hour: "2-digit",
              hour12: false,
              minute: "2-digit",
            });

            const arrivingIn = Math.floor(
              (dateOfArrival - Date.now()) / 1000 / 60
            );

            return (
              <StopInfo
                key={index}
                arrivingIn={arrivingIn}
                trip={trip}
                headsign={headsign}
                day={day}
                time={time}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

Stops.protoTypes = {
  data: PropTypes.object,
  fetchData: PropTypes.func,
  fetchFailed: PropTypes.func,
  fetchSuccess: PropTypes.func,
};

function mapStateToProps(state) {
  const { stops } = state;
  return {
    stops,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchingData());
    },
    fetchFailed: (error) => {
      dispatch(fetchingFailed(error));
    },
    fetchSuccess: (data) => {
      dispatch(fetchingSuccess(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stops);
