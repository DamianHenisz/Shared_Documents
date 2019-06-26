import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      console.log(res.data);
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login User
//Get User Token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const token = res.data.token;
      //Set token to Local Storage
      localStorage.setItem("token", token);
      //Set token to header
      setAuthToken(token);
      //Decode token to get userData
      const decodedToken = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decodedToken));
      history.push("documents");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Set Current User
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

//Logout user
//Delete Token User
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("token");
  //Remove auth header for requests
  setAuthToken(false);
  //Set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
