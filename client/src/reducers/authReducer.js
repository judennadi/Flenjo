const authReducer = (state, action) => {
  if (action.type === "SET_USER") {
    return { ...state, user: action.user, isAuth: action.isAuth };
  } else if (action.type === "REGISTER_MODAL") {
    return { ...state, openRegisterModal: action.payload, openLoginModal: false };
  }
};

export default authReducer;
