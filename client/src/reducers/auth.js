import { createSlice } from "@reduxjs/toolkit";

const prevState = JSON.parse(localStorage.getItem("state"));
const initialState = prevState ? { user: prevState, isAuth: true } : { user: {}, isAuth: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("state", JSON.stringify(state.user));
    },
    REMOVE_USER: (state, action) => {
      state.user = action.payload;
      state.isAuth = false;
      localStorage.removeItem("state");
    },
  },
});

export const { SET_USER, REMOVE_USER } = authSlice.actions;
export default authSlice.reducer;
