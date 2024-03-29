const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
require("./config/db");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

// Modules
const auth = require("./routes/AuthRoute");
const users = require("./routes/UsersRoute");

const app = express();

// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload middleware
app.use(fileUpload());

// Sanitize-data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable Cors
app.use(cors());

app.use("/api/v1/auth", auth);
app.use("/api/v1/user", users);

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
