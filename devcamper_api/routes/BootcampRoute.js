const express = require("express");
const route = express.Router();

route.post("/");
route.get("/", (req, res) => {
  res.send("working");
});
route.get("/:id");
route.put("/");
route.delete("/");

module.exports = route;
