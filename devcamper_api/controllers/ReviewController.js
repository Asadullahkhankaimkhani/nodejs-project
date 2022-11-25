const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Review = require("../models/ReviewModel");
const Bootcamp = require("../models/BootcampModel");

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const review = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: review.length,
      data: review,
    });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    new ErrorResponse(
      `No bootcamp found with the id of ${req.params.bootcampId}`,
      404
    );
  }
  const review = await Review.create(req.body);

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    new ErrorResponse(`No review found with the id of ${req.params.id}`, 404);
  }

  //  Make user review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && user.user.role !== "admin") {
    new ErrorResponse(
      `Not authorized to update review ${req.params.bootcampId}`,
      404
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    new ErrorResponse(`No review found with the id of ${req.params.id}`, 404);
  }

  //  Make user review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && user.user.role !== "admin") {
    new ErrorResponse(
      `Not authorized to update review ${req.params.bootcampId}`,
      404
    );
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
