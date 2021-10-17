const authReducer = (state, action) => {
  if (action.type === "LOGIN_MODAL") {
    return { ...state, openLoginModal: action.payload, openRegisterModal: false };
  } else if (action.type === "REGISTER_MODAL") {
    return { ...state, openRegisterModal: action.payload, openLoginModal: false };
  }
};

export default authReducer;
