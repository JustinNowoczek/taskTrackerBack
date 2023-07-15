//#import external libraries
const express = require("express");

//#import connected files
const { getTasksController, markTaskController, deleteTaskController } = require("../../controllers/dashboard/taskControllers");
const missingUserHandler = require("../../middlewares/errorHandlers/missingUserHandler");
const userAuthHandler = require("../../middlewares/errorHandlers/userAuthHandler");
const badParamsHandler = require("../../middlewares/errorHandlers/badParamsHandler");
const missingTaskHandler = require("../../middlewares/errorHandlers/missingTaskHandler");

const getTasksRoute = express.Router();
getTasksRoute.get("/:userID/:isCompleted/:sortDateNotPriority", missingUserHandler, userAuthHandler, badParamsHandler, getTasksController);

const taskManagementRoutes = express.Router();
taskManagementRoutes.put("/:userID/:taskID/", missingUserHandler, userAuthHandler, missingTaskHandler, markTaskController);
taskManagementRoutes.delete("/:userID/:taskID", missingUserHandler, userAuthHandler, missingTaskHandler, deleteTaskController);

module.exports = {
  getTasksRoute,
  taskManagementRoutes,
};
