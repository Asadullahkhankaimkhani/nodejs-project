const Bootcamp = require("../models/BootcampModel");

exports.getAllBootcamp = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      status: true,
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
