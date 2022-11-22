const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  deleteBootcamp,
  getAllBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/BootcampController");
const { protect } = require("../middlewares/auth");

const Bootcamp = require("../models/BootcampModel");

const advanceResults = require("../middlewares/advancedResult");

// Include other resources router
const courseRouter = require("./CoursesRoute");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/")
  .get(advanceResults(Bootcamp, "courses"), getAllBootcamp)
  .post(protect, createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
