const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/BootcampModel");

exports.getAllBootcamp = AsyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    status: true,
    count: bootcamps.length,
    bootcamps,
  });
});

exports.getSingleBootcamp = AsyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with this id ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({
    status: true,
    bootcamp,
  });
});

exports.createBootcamp = AsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json(bootcamp);
});

exports.updateBootcamp = AsyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with this id ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({
    status: true,
    bootcamp,
  });
});

exports.deleteBootcamp = AsyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with this id ${req.params.id} not found`, 404)
    );
  }
  return res.status(200).json({
    status: true,
    bootcamp: {},
  });
});
