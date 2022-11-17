const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const dbconnect = require("./config/db");
const errorHandler = require("./middlewares/error");
const colors = require("colors");

// Modules
const bootcamp = require("./routes/BootcampRoute");
const courses = require("./routes/CoursesRoute");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamp", bootcamp);
app.use("/api/v1/course", courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    colors.bgWhite.green(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Error:", err.message);
  app.close(() => process.exit(1));
});
