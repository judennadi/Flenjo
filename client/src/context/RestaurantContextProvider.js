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
};

const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  let mql = window.matchMedia("(max-width: 600px)");
  console.log(state.term);

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
        dispatch({ type: "SET_SEARCH_LOADING", payload: true });
      } else if (state.isSearch) {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      } else {
        dispatch({ type: "SET_SUBLOADING", payload: true });
      }

      try {
        const { data } = await axios.get(`/api/restaurants?term=${state.term}&page=${state.page - 1}`, {
          cancelToken: source.token,
        });
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
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        dispatch({ type: "SET_ERROR", payload: true });
        console.error(error);
      }
    };
    fetchData();
  }, [state.page, state.term, state.isSearch, mql.matches]);

  return <RestaurantContext.Provider value={{ ...state, dispatch }}>{children}</RestaurantContext.Provider>;
};

export default RestaurantContextProvider;
