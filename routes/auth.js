const router = require("express").Router();

const { login, register, logout } = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
