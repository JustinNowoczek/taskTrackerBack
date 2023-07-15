const mongoose = require("mongoose");
require("dotenv").config();
const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;

module.exports = mongoose
  .connect(dbConnectionString)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
