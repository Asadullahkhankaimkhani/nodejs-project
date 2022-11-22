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

  sendTokenResponse(user, 200, res);
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

  sendTokenResponse(user, 200, res);
});

// Get token from model , create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

exports.getMe = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
