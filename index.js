//#import external libraries
require("dotenv").config();
const express = require("express");
const cors = require("cors");
//#import connected files
const { registerUserRoute, loginUserRoute } = require("./routes/userAuthRoutes");
const { userManagementRoutes } = require("./routes/dashboardRoutes/userManagementRoutes");
const { taskManagementRoutes, getTasksRoute } = require("./routes/dashboardRoutes/taskManagementRoutes");

//database connection
require("./utils/dbConnect");
//create express server
const app = express();
//allow passing json files and cors access
app.use(cors());
app.use(express.json());

//routes
app.use("/api", registerUserRoute);
app.use("/api", loginUserRoute);
app.use("/api/dashboard", userManagementRoutes);
app.use("/api/dashboard", taskManagementRoutes);
app.use("/api/dashboard", getTasksRoute);
app.use("*", (req, res) => {
  res.send("Invalid api route");
});

//#server start
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("Running index.js on " + port);
});
