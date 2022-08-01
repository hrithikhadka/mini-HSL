import { FETCHING_DATA, FETCHING_FAILED, FETCHING_SUCCESS } from "../constants";

export const fetchingData = () => {
  return {
    type: FETCHING_DATA,
  };
};

export const fetchingFailed = (error) => {
  return {
    type: FETCHING_FAILED,
    payload: error,
  };
};

export const fetchingSuccess = ({ data }) => {
  return {
    type: FETCHING_SUCCESS,
    payload: data.stop,
  };
};
