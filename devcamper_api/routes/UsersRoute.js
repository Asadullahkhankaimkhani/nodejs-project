const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/UsersController");
const User = require("../models/UserModel");

const { protect, authorize } = require("../middlewares/auth");
const advancedResult = require("../middlewares/advancedResult");

router.use(protect);
router.use(authorize("role"));

router.route("/").get(advancedResult(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
