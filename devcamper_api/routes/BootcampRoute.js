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

// Include other resources router
const courseRouter = require("./CoursesRoute");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/").get(getAllBootcamp).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
