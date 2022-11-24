const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require("../controllers/AuthController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.get("/me", protect, getMe);

module.exports = router;
