const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, required: true, default: false },
  user: { type: "ObjectId", ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
