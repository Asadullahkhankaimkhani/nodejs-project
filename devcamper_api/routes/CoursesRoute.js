const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/CoursesController");
const { protect } = require("../middlewares/auth");

const Course = require("../models/CourseModel");
const advancedResult = require("../middlewares/advancedResult");

router
  .route("/")
  .get(
    advancedResult(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
