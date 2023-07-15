//#import external libraries
const express = require("express");

//#import connected files
const { registerUserController, loginUserController } = require("../controllers/userAuthControllers");
const userExistsHandler = require("../middlewares/errorHandlers/userExistsHandler");

const registerUserRoute = express.Router();
registerUserRoute.post("/register/", userExistsHandler, registerUserController);

const loginUserRoute = express.Router();
loginUserRoute.post("/login/", loginUserController);

module.exports = {
  registerUserRoute,
  loginUserRoute,
};
