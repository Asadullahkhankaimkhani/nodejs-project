const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/UserModel");

exports.register = AsyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
