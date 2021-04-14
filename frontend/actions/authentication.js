import axios from "axios";
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from "./types";
import { BASE_URL } from "./env";

//Create Token Config
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().authentication.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",

    },
  };

  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${BASE_URL}/api/get-user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err.response.data)
      //dispatch(returnErrors(err.response.data, err.response.status));
       dispatch({
         type: AUTH_ERROR,
       });
    });
};

// LOGIN USER
export const login = (email, password) => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/api/login`, { email, password }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err.response.data)
      //dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${BASE_URL}/api/logout`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
        console.log(err.response.data)
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};
