//#import external libraries
const express = require("express");

//#import connected files
const { getUserController, deleteUserController, createUserTaskController } = require("../../controllers/dashboard/userControllers");
const userAuthHandler = require("../../middlewares/errorHandlers/userAuthHandler");
const missingUserHandler = require("../../middlewares/errorHandlers/missingUserHandler");

const userManagementRoutes = express.Router();
userManagementRoutes.get("/:userID", missingUserHandler, userAuthHandler, getUserController);
userManagementRoutes.delete("/:userID", missingUserHandler, userAuthHandler, deleteUserController);
userManagementRoutes.post("/:userID", missingUserHandler, userAuthHandler, createUserTaskController);

module.exports = {
  userManagementRoutes,
};
