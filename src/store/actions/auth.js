import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import qs from "querystring";
import * as secret from "./secret";

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const loginSubmit = (formData) => {
  formData = {
    ...formData,
    grant_type: secret.GRANT_PASSWORD,
    client_id: secret.CLIENT_ID,
    client_secret: secret.CLIENT_SECRET,
  };

  let data = qs.stringify(formData);

  return (dispatch) => {
    dispatch(loginStart());
    getUserAccessTokens(data, dispatch);
  };
};

export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT });
  };
};

const getUserAccessTokens = (data, dispatch) => {
  axios
    .post("http://react-drupal.com/oauth/token", data)
    .then((response) => {
      console.log("access token response", response);

      if (response && response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
      } else {
        dispatch(logoutUser());
      }
    })
    .catch((error) => {
      console.log("error", error.response);
      dispatch(loginFail());
    });
};

export const checkAuthentication = () => {
  return (dispatch) => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token && refresh_token) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  };
};

export const refreshAccessToken = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  let data = {
    grant_type: secret.GRANT_REFRESH_TOKEN,
    client_id: secret.CLIENT_ID,
    client_secret: secret.CLIENT_SECRET,
    refresh_token: refresh_token,
  };

  data = qs.stringify(data);

  return (dispatch) => {
    getUserAccessTokens(data, dispatch);
  };
};
