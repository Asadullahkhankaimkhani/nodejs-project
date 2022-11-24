const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/UserModel");

exports.getUsers = AsyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getUser = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = AsyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.updateUser = AsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = AsyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
