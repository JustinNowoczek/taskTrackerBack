//#import external libraries
const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: [],
    },
  ],
  authToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
