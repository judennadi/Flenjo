const restaurantReducer = (state, action) => {
  if (action.type === "SET_RESTAURANTS") {
    return { ...state, restaurants: action.payload, isLoading: false, isError: false };
  } else if (action.type === "SET_RESTAURANT") {
    for (let i = 0; i < state.restaurants.length; i++) {
      if (state.restaurants[i].id === action.payload) {
        sessionStorage.setItem("restaurant", JSON.stringify(state.restaurants[i]));
        return { ...state, restaurant: state.restaurants[i] };
      }
    }
  } else if (action.type === "SET_LOADING") {
    return { ...state, isLoading: action.payload };
  } else if (action.type === "SET_ERROR") {
    return { ...state, isError: action.payload };
  } else {
    return state;
  }
};

export default restaurantReducer;
