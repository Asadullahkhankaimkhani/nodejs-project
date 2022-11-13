const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/BootcampModel");
const geocoder = require("../utils/geocoder");

exports.getAllBootcamp = AsyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));
  const bootcamps = await query;
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

exports.getBootcampsInRadius = AsyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from geocoder

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius using radians
  // Divide dist by radius of earth
  // Earth Radius = 3,963 mi / 6,379 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
