import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../reducers/auth";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  // const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post("/auth/login", { username, password }, config);
      if (data.data) {
        dispatch(SET_USER(data.data));
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div className="auth-con cen-grid">
      <div className="auth-modal login">
        <div className="logo">
          <h1 style={{ letterSpacing: "-1px" }} onClick={() => history.push("/")}>
            FLENJO
          </h1>
        </div>
        <div className="title">
          <h1>Login</h1>
        </div>
        <form className="auth-form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-con">
            <TextField
              variant="outlined"
              size="small"
              name="username"
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-con">
            <TextField
              variant="outlined"
              size="small"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <span className="error-msg">{error}</span>}

          <div className="cen-grid">
            <Button variant="contained" color="secondary" type="submit">
              Login
            </Button>
          </div>
        </form>
        <p>
          New to Flenjo?{" "}
          <Link to="/register" style={{ color: "#ed5a6b" }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
