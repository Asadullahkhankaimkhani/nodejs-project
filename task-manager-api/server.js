const express = require("express");
const app = express();

// Middleware

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Manager");
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server is Running"));
