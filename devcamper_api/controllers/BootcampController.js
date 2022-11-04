const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/BootcampModel");

exports.getAllBootcamp = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      status: true,
      count: bootcamps.length,
      bootcamps,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with this id ${req.params.id} not found`,
          404
        )
      );
    }
    return res.status(200).json({
      status: true,
      bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (err) {
    next(err);
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with this id ${req.params.id} not found`,
          404
        )
      );
    }
    return res.status(200).json({
      status: true,
      bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with this id ${req.params.id} not found`,
          404
        )
      );
    }
    return res.status(200).json({
      status: true,
      bootcamp: {},
    });
  } catch (err) {
    next(err);
  }
};
