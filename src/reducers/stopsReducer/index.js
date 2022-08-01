import {
  FETCHING_DATA,
  FETCHING_FAILED,
  FETCHING_SUCCESS,
} from "../../constants";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const stopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return { loading: true, data: {}, error: "" };
    case FETCHING_FAILED:
      return { loading: false, data: {}, error: action.payload };
    case FETCHING_SUCCESS:
      return { loading: false, data: action.payload, error: "" };
    default:
      return state;
  }
};

export default stopsReducer;
