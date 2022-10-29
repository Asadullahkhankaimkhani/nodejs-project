const mongoose = require("mongoose");

const dbConnect = (async function () {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("########## Database Connected ##########");
  } catch (error) {
    console.log(" Database Error ", error);
  }
})();

module.exports = dbConnect;
