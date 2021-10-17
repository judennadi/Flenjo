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
    return {
      ...state,
      isLoading: action.payload,
      isResSearch: false,
      isBarSearch: false,
      isHotSearch: false,
      isSubLoading: false,
      isError: false,
    };
  } else if (action.type === "SET_SUBLOADING") {
    return { ...state, isSubLoading: action.payload, isLoading: false, isError: false };
  } else if (action.type === "SET_ERROR") {
    return { ...state, isError: action.payload, isLoading: false, isSubLoading: false };
  } else if (action.type === "SET_PAGE") {
    return { ...state, page: action.payload };
  } else if (action.type === "SET_RES_TERM") {
    return {
      ...state,
      term: action.payload,
      page: 1,
      isResSearch: true,
      isBarSearch: false,
      isHotSearch: false,
      isSubLoading: true,
    };
  } else if (action.type === "SET_BAR_TERM") {
    return {
      ...state,
      term: action.payload,
      page: 1,
      isResSearch: false,
      isBarSearch: true,
      isHotSearch: false,
      isSubLoading: true,
    };
  } else if (action.type === "SET_HOT_TERM") {
    return {
      ...state,
      term: action.payload,
      page: 1,
      isResSearch: false,
      isBarSearch: false,
      isHotSearch: true,
      isSubLoading: true,
    };
  } else if (action.type === "CLEAR_TERM") {
    return {
      ...state,
      term: action.payload,
      page: 1,
      isResSearch: false,
      isBarSearch: false,
      isHotSearch: false,
    };
  } else if (action.type === "SET_RATING") {
    return { ...state, rating: action.payload, page: 1 };
  } else if (action.type === "CLEAR_RATING") {
    return { ...state, rating: "", page: 1 };
  } else {
    return state;
  }
};

export default restaurantReducer;
