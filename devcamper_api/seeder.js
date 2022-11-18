const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./models/BootcampModel");
const Course = require("./models/CourseModel");

const dbConnect = (async function () {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("########## Database Connected ##########");
  } catch (error) {
    console.log(" Database Error ", error);
  }
})();

const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into DB

const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    await Course.create(course);
    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data Destroyed...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
