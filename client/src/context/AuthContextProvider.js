import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/authReducer";
// import axios from "axios";

export const AuthContext = createContext();

const initialState = {
  user: {},
  openLoginModal: true,
  openRegisterModal: true,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {});

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
