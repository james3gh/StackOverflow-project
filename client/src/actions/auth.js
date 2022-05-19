import * as api from "../api/index.js";
import { setCurrentUser } from "../actions/currentUser";

// action creators

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    let { data } = await api.signUp(authData);
    console.log(data);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    console.log(data);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
