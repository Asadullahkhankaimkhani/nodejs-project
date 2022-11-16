const express = require("express");
const router = express.Router();
const { getCourses } = require("../controllers/CoursesController");

router.route("/:bootcampId").get(getCourses);

module.exports = router;
