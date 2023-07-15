require("dotenv").config();
const mongoose = require("mongoose");

const dbConnectionString = process.env.MONGODB_CONNECTION_STRING;

module.exports = mongoose
  .connect(dbConnectionString)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log("tERROR");
    return console.log(err);
  });
