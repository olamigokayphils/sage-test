import axios from "axios";
import { GET_INVESTMENTS, ADD_INVESTMENT, UPDATE_INVESTMENT, DELETE_INVESTMENT } from "./types";
import { tokenConfig } from "./authentication";
import { BASE_URL } from "./env";


//GET INVESTMENTS
export const getInvestments = () => (dispatch, getState) => {

    axios
    .get(`${BASE_URL}/api/investments`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INVESTMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
        console.log(err.response.data)
      //dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addInvestment = (title, amount) => (dispatch, getState) => {

  axios
  .post(`${BASE_URL}/api/investments`, {title: title, amount: amount, type: "monthly"}, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: ADD_INVESTMENT,
      payload: res.data,
    });
  })
  .catch((err) => {
      console.log(err.response.data)
    //dispatch(returnErrors(err.response.data, err.response.status));
  });
};

export const deleteInvestment = (investmentId) => (dispatch, getState) => {

  axios
  .delete(`${BASE_URL}/api/investments/${investmentId}`, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: DELETE_INVESTMENT,
      payload: res.data,
    });
  })
  .catch((err) => {
      console.log(err.response.data)
    //dispatch(returnErrors(err.response.data, err.response.status));
  });
};