const express = require("express");
const router = express.Router({ mergeParams: true });
const { getReviews, getReview } = require("../controllers/ReviewController");
const { protect, authorize } = require("../middlewares/auth");

const Review = require("../models/ReviewModel");
const advancedResult = require("../middlewares/advancedResult");

router.route("/").get(
  advancedResult(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

router.route("/:id").get(getReview);

module.exports = router;
