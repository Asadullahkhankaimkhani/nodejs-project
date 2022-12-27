const createTask = (req, res) => {
  res.send("Create Task");
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
