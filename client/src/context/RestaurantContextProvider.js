import React, { createContext, useReducer, useEffect } from "react";
import restaurantReducer from "../reducers/restaurantReducer";
import axios from "axios";

export const RestaurantContext = createContext();

const initialState = { isLoading: true, isError: false, restaurants: [], page: 1, total: null, term: "" };

const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  let mql = window.matchMedia("(max-width: 600px)");
  console.log(state);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "SET_LOADING", payload: true });

  //     try {
  //       const { data } = await axios.get(`/api/restaurants`);
  //       dispatch({ type: "SET_RESTAURANTS", payload: data.data });
  //     } catch (error) {
  //       dispatch({ type: "SET_ERROR", payload: true });
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      if (state.page <= 1 && !state.term) {
        dispatch({ type: "SET_LOADING", payload: true });
      } else if (state.term) {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      } else {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      }

      try {
        const { data } = await axios.get(`/api/restaurants?page=${state.page - 1}&term=${state.term}`, {
          cancelToken: source.token,
        });
        dispatch({ type: "SET_RESTAURANTS", payload: data.data, total: data.total });
        if (mql.matches) {
          window.scrollTo(0, 620);
        } else {
          window.scrollTo(0, 775);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        dispatch({ type: "SET_ERROR", payload: true });
        console.error(error);
      }
    };
    fetchData();
  }, [state.page, state.term, mql.matches]);

  return <RestaurantContext.Provider value={{ ...state, dispatch }}>{children}</RestaurantContext.Provider>;
};

export default RestaurantContextProvider;
