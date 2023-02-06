const Task = require("../models/task");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

// Get all Tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({ allTasks });
});

// Create New Task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// Get a Single Task
const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// Delete a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// Update Task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ id: taskID, data: { name, completed } });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
