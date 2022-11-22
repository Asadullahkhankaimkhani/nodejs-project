const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/UserModel");
const ErrorResponse = require("../utils/errorResponse");

// Protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   else if (req.cookie.token) {
  //     token = req.cookie.token;
  //   }

  //    Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});
