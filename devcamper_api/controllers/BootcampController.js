const ErrorResponse = require("../utils/errorResponse");
const AsyncHandler = require("../middlewares/async");
const Bootcamp = require("../models/BootcampModel");
const geocoder = require("../utils/geocoder");
const path = require("path");

exports.getAllBootcamp = AsyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
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
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with this id ${req.params.id} not found`, 404)
    );
  }
  bootcamp.remove();
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

exports.bootcampPhotoUpload = AsyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with this id ${req.params.id} not found`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an Image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an Image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
