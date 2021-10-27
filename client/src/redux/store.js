import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import restaurantReducer from "./restaurants";

const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer,
  },
});

export default store;
