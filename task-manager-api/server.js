const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
// import routes
const task = require("./routes/task.route");

// Middleware

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Manager");
});

app.use("/api/v1", task);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is Running"));
