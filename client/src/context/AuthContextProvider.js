import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
// import axios from "axios";

export const AuthContext = createContext();

const prevState = JSON.parse(localStorage.getItem("state"));
const initialState = prevState ? { user: prevState, isAuth: true } : { user: {}, isAuth: false };

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.isAuth) {
      localStorage.setItem("state", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("state");
    }
  }, [state]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
