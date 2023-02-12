const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const cors = require("cors");

// import routes
const task = require("./routes/task.route");
const morgan = require("morgan");

// Middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
	res.send("Task Manager");
});

app.use("/api/v1", task);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is Running"));
