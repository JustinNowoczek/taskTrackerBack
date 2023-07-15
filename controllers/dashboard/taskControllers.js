//#import connected files
const User = require("../../models/User");
const Task = require("../../models/Task");

//get user and send all user tasks based on other params
const getTasksController = async (req, res) => {
  const userID = req.authenticatedUserID;
  const { isCompleted, sortDateNotPriority } = req.params;
  try {
    const tasks = await Task.find({ isCompleted, userID })
      .sort(
        sortDateNotPriority == "true"
          ? {
              dueDate: 1,
              priorityLevel: 1,
            }
          : {
              priorityLevel: 1,
              dueDate: 1,
            }
      )
      .lean()
      .select("_id name isCompleted dueDate priorityLevel");
    res.json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

//get user and task and mark it as completed
const markTaskController = async (req, res) => {
  const taskID = req.authenticatedTaskID;
  try {
    await Task.findByIdAndUpdate(taskID, {
      isCompleted: true,
    });
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

//get user and task and delete the task from both
const deleteTaskController = async (req, res) => {
  const userID = req.authenticatedUserID;
  const taskID = req.authenticatedTaskID;
  try {
    const matchingUser = await User.findById(userID);
    const updatedTaskList = matchingUser.tasks.filter((task) => {
      return task.toString() != taskID;
    });
    console.log(updatedTaskList);
    matchingUser.tasks = updatedTaskList;
    await matchingUser.save();
    await Task.findByIdAndDelete(taskID);
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
  getTasksController,
  markTaskController,
  deleteTaskController,
};
