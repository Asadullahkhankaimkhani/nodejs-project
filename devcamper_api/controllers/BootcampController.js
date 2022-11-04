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
    res.status(400).json({
      status: false,
    });
  }
};

exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `bootcamp with this id of ${req.params.id} not found`,
          404
        )
      );
    }
    return res.status(200).json({
      status: true,
      bootcamp,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        `bootcamp with this id of ${req.params.id} not found`,
        404
      )
    );
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (err) {
    return res.status(400).json({
      status: false,
    });
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      bootcamp,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
    });
  }
};

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
      bootcamp: {},
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
    });
  }
};
