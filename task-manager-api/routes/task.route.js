const express = require("express");
const routes = express.Router();

// Controllers
const { createTask } = require("../controller/task.controller");

routes.route("/task").post(createTask);
