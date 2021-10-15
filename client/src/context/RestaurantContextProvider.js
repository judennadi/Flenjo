import React, { createContext, useReducer, useEffect } from "react";
import restaurantReducer from "../reducers/restaurantReducer";
import axios from "axios";

export const RestaurantContext = createContext();

const initialState = {
  isLoading: true,
  isSubLoading: false,
  isSearch: false,
  isError: false,
  restaurants: [],
  page: 1,
  total: null,
  term: "",
  rating: "",
};

const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  let mql = window.matchMedia("(max-width: 600px)");

  useEffect(() => {
    let mounted = true;
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      if (state.page <= 1 && !state.term) {
        dispatch({ type: "SET_LOADING", payload: true });
      } else if (state.rating) {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      } else {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      }

      try {
        const { data } = await axios.get(
          `/api/restaurants?term=${state.term}&page=${state.page - 1}&rating=${
            state.rating ? state.rating : ""
          }`,
          {
            cancelToken: source.token,
          }
        );
        if (mounted) {
          dispatch({ type: "SET_RESTAURANTS", payload: data.data, total: data.total });
          if (!state.term && state.page > 1) {
            if (mql.matches) {
              window.scrollTo(0, 620);
            } else {
              window.scrollTo(0, 775);
            }
          } else if (state.term) {
            window.scrollTo(0, 0);
          }
        }
      } catch (error) {
        if (mounted) {
          dispatch({ type: "SET_ERROR", payload: true });
          if (axios.isCancel(error)) {
            console.log("axios cancelled");
          } else {
            console.error(error);
          }
        }
      }
    };
    fetchData();

    return () => {
      mounted = false;
      source.cancel();
    };
  }, [state.page, state.term, state.isSearch, mql.matches, state.rating]);

  return <RestaurantContext.Provider value={{ ...state, dispatch }}>{children}</RestaurantContext.Provider>;
};

export default RestaurantContextProvider;
