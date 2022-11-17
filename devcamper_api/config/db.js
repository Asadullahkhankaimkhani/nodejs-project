const mongoose = require("mongoose");
const colors = require("colors");

const dbConnect = (async function () {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log(
      colors.bgYellow.yellow("########## Database Connected ##########")
    );
  } catch (error) {
    console.log(" Database Error ", error);
  }
})();

module.exports = dbConnect;
