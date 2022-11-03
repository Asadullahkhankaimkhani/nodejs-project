const Bootcamp = require("../models/BootcampModel");

exports.getAllBootcamp = async (req, res, next) => {};
exports.getSingleBootcamp = async (req, res, next) => {};

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

exports.updateBootcamp = async (req, res, next) => {};
exports.deleteBootcamp = async (req, res, next) => {};
