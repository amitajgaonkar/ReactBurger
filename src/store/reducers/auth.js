import * as actionTypes from "../../store/actions/actionTypes";

const initialState = {
  loading: false,
  access_token: null,
  refresh_token: null,
  exp_time: null,
  logged_in: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        access_token: action.access_token,
        refresh_token: action.refresh_token,
        exp_time: action.exp_time,
        logged_in: true,
      };
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        access_token: null,
        refresh_token: null,
        exp_time: null,
        logged_in: false,
      };
    default:
      return state;
  }
};

export default reducer;
