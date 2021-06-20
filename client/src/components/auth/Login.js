const Login = () => {
  return (
    <div className="container">
      <div className="auth-con">
        <div className="form-con">
          <form>
            <h4>Log in</h4>
            <div className="äuth-input">
              <input type="text" />
            </div>
            <div className="äuth-input">
              <input type="password" />
            </div>
            <p>Or</p>
            <div className="oauth"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
