const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Modules
const bootcamp = require("./routes/BootcampRoute");

const app = express();

app.use("/api/v1/bootcamp", bootcamp);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
