const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resettoken", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;
