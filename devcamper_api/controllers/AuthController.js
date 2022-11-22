const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/UserModel");

exports.register = AsyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  res.status(200).json({ success: true });
});
