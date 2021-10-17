import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
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
      const { data } = await axios.post("/auth/login", { email, password }, config);
      console.log(data);
      if (data.error) {
        setError(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-con cen-grid">
      <div className="auth-modal login">
        <div className="title">
          <h1>Login</h1>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-con">
            <TextField
              variant="outlined"
              size="small"
              name="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-con">
            <TextField
              variant="outlined"
              size="small"
              name="password"
              label="Password"
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
