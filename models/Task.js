//#import external libraries
const mongoose = require("mongoose");

//schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priorityLevel: {
    type: Number,
    enum: [3, 2, 1],
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
