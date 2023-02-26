require("dotenv").config();

const express = require("express");

const app = express();
require("./config/db");

// imports
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");

// routes
const productRoute = require("./routes/product.router");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
	res.send("<h1>Store API</h1>");
});
app.use("/api/products", productRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
