//#import connected files
const User = require("../models/User");

//given the name and password check if the name is already a user, if not create the user
const registerUserController = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.create({
      name,
      password,
    });
    const userID = user._id;
    await User.findByIdAndUpdate(userID, { authToken: `${userID}TOKEN` });
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

//given the name and password check if user with name exists, if so check if password matches
const loginUserController = async (req, res) => {
  const { name, password } = req.body;
  try {
    const matchingUser = await User.findOne({ name }).lean();
    if (matchingUser?.password !== password) {
      res.status(401).json({
        status: "fail",
        code: "invalidLogin",
        data: "Invalid login credentials.",
      });
    } else {
      res.json({
        status: "success",
        data: { authToken: matchingUser.authToken, userID: matchingUser._id },
      });
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
