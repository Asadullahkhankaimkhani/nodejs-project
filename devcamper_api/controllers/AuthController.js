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

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

exports.login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validator email and password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please proveide an email and password", 400)
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials ", 401));
  }
  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials ", 401));
  }

  // create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
