import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const Register = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="auth-modal">
          <div className="title">
            <h1>Register</h1>
            <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
              <Close />
            </div>
          </div>
          <form className="auth-form">
            <div className="input-con">
              <TextField variant="outlined" size="small" name="name" label="Name" fullWidth />
            </div>
            <div className="input-con">
              <TextField variant="outlined" size="small" name="email" label="Email" fullWidth />
            </div>
            <div className="input-con">
              <TextField variant="outlined" size="small" name="username" label="Username" fullWidth />
            </div>
            <div className="input-con">
              <TextField variant="outlined" size="small" name="password" label="Password" fullWidth />
            </div>
            <div className="input-con">
              <TextField
                variant="outlined"
                size="small"
                name="confirm_Password"
                label="Confirm Password"
                fullWidth
              />
            </div>
            <div className="cen-grid">
              <Button variant="contained" color="secondary" type="submit">
                Register
              </Button>
            </div>
          </form>
          <p>
            Already a member?{" "}
            <Link to="/login" style={{ color: "#ed5a6b" }}>
              Login
            </Link>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
