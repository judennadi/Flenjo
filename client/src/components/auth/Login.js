import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const Login = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="auth-modal login">
          <div className="title">
            <h1>Login</h1>
            <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
              <Close />
            </div>
          </div>
          <form className="auth-form">
            <div className="input-con">
              <TextField variant="outlined" size="small" name="username" label="Username" fullWidth />
            </div>
            <div className="input-con">
              <TextField variant="outlined" size="small" name="password" label="Password" fullWidth />
            </div>
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
      </Modal>
    </div>
  );
};

export default Login;
