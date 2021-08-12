const restaurantReducer = (state, action) => {
  if (action.type === "SET_RESTAURANTS") {
    return {
      ...state,
      restaurants: action.payload,
      total: action.total,
      isLoading: false,
      isSubLoading: false,
      isError: false,
    };
  } else if (action.type === "SET_LOADING") {
    return { ...state, isLoading: action.payload, isSubLoading: false, isError: false };
  } else if (action.type === "SET_SUBLOADING") {
    return { ...state, isSubLoading: action.payload, isLoading: false, isError: false };
  } else if (action.type === "SET_ERROR") {
    return { ...state, isError: action.payload, isLoading: false, isSubLoading: false };
  } else if (action.type === "SET_PAGE") {
    return { ...state, page: action.payload };
  } else if (action.type === "SET_TERM") {
    return { ...state, term: action.payload };
  } else {
    return state;
  }
};

export default restaurantReducer;
