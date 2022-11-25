const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReviews,
  getReview,
  addReview,
} = require("../controllers/ReviewController");
const { protect, authorize } = require("../middlewares/auth");

const Review = require("../models/ReviewModel");
const advancedResult = require("../middlewares/advancedResult");

router
  .route("/")
  .get(
    advancedResult(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router.route("/:id").get(getReview);

module.exports = router;
