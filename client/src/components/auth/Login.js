import { Modal, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     root: {
//       "& > :last-child": {
//         outline: "none",
//       },
//     },
//   },
// }));

const Login = () => {
  // const classes = useStyles();
  const [openAuth, setOpenAuth] = useState(false);
  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleOpenAuth();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container">
      <Modal open={openAuth} onClose={handleCloseAuth}>
        <div className="auth-modal">
          <div className="title">
            <h2>Login</h2>
            <div>X</div>
          </div>
          <form className="auth-form">
            <div className="input">
              <TextField />
            </div>
            <div className="input">
              <input type="text" name="password" placeholder="Password" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
