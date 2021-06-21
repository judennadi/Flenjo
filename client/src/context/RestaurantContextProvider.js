import React, { createContext, useReducer, useEffect } from "react";
import restaurantReducer from "../reducers/restaurantReducer";
import axios from "axios";

export const RestaurantContext = createContext();

const prevRestaurant = JSON.parse(sessionStorage.getItem("restaurant"));
const initialState = prevRestaurant
  ? { isLoading: true, isError: false, restaurants: [], restaurant: prevRestaurant }
  : { isLoading: true, isError: false, restaurants: [], restaurant: null };

const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const { data } = await axios.get(`/api/restaurants`);
        dispatch({ type: "SET_RESTAURANTS", payload: data.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: true });
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <RestaurantContext.Provider value={{ ...state, dispatch }}>{children}</RestaurantContext.Provider>;
};

export default RestaurantContextProvider;
