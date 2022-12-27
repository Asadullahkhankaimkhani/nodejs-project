const mongoose = require("mongoose");
const mongo_string =
  "mongodb+srv://asadullah:Summer1190@all-dbs.t3oyo.mongodb.net/Task-Manager?retryWrites=true&w=majority";

mongoose
  .connect(mongo_string)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log(err));
