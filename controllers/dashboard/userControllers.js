//#import connected files

const User = require("../../models/User");
const Task = require("../../models/Task");

//given user checks if header token is valid and sends back useful user info and tasks
const getUserController = async (req, res) => {
  const userID = req.authenticatedUserID;
  try {
    const authenticatedUser = await User.findById(userID).select("-_id name tasks").populate("tasks").lean();
    res.json({
      status: "success",
      data: authenticatedUser,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

//given user checks if header token is valid and deletes user and their tasks
const deleteUserController = async (req, res) => {
  const userID = req.authenticatedUserID;
  try {
    await User.findByIdAndDelete(userID);
    await Task.deleteMany({ userID });
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

//get user and create a task for that user, pushing its id into users tasks array
const createUserTaskController = async (req, res) => {
  const userID = req.authenticatedUserID;
  const { name, priorityLevel, dueDate } = req.body;
  try {
    const task = await Task.create({
      name,
      priorityLevel,
      dueDate,
      userID,
    });
    const matchingUser = await User.findById(userID);
    matchingUser.tasks.push(task._id);
    matchingUser.save();
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

module.exports = {
  getUserController,
  deleteUserController,
  createUserTaskController,
};
