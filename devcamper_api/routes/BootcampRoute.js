const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  deleteBootcamp,
  getAllBootcamp,
  getSingleBootcamp,
  updateBootcamp,
} = require("../controllers/BootcampController");

router.route("/").get(getAllBootcamp).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
