const mongoose = require("mongoose");

// Connect to the database
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Database Connected!"))
	.catch((err) => console.log(err));
