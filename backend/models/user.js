const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.post("remove", function (doc) {
  Task.deleteMany({ user: doc._id }).exec();
});

module.exports = mongoose.model("User", userSchema);
