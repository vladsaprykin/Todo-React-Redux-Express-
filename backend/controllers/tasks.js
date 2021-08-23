const Task = require("../models/task");

exports.task_create = async (req, res, next) => {
  try {
    const task = new Task({
      todo: req.body.todo,
      isCompleted: false,
    });
    const result = await task.save();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};
exports.task_getAll = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};
exports.task_update = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};

exports.task_delete = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndRemove(req.params.id);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};
exports.tasks_setCompleted = async (req, res, next) => {
  try {
    const result = await Task.updateMany({}, { isCompleted: true });
    res.send("all Completed");
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};

exports.tasks_bulk_delete = async (req, res, next) => {
  try {
    const result = await Task.deleteMany({ isCompleted: true });
    res.send("Deleted successfully!");
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Server error" });
  }
};
