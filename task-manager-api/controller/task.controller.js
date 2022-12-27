const Task = require("../Model/task.model");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getAllTask = (req, res) => {
  res.send("Get All Task");
};

const getOneTask = (req, res) => {
  res.send("Get Single Task");
};

const updateTask = (req, res) => {
  res.send("Update Task");
};

const deleteTask = (req, res) => {
  res.send("Delete Task");
};

module.exports = {
  createTask,
  deleteTask,
  getAllTask,
  getOneTask,
  updateTask,
};
