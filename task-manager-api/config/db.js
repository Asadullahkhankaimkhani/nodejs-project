const mongoose = require("mongoose");

// database connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Database Connected!"))
	.catch((err) => console.log(err));
