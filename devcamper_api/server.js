const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const dbconnect = require("./config/db");
const errorHandler = require("./middlewares/error");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const path = require("path");

// Modules
const bootcamp = require("./routes/BootcampRoute");
const courses = require("./routes/CoursesRoute");
const auth = require("./routes/AuthRoute");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload middleware
app.use(fileUpload());

// set static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootcamp", bootcamp);
app.use("/api/v1/course", courses);
app.use("/api/v1/auth", auth);

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
