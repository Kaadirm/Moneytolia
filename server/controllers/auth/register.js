const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
const User = require("../../models/User");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  if (await isUsernameTaken(username)) {
    throw new BadRequestError("Username is already taken");
  }

  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({
      data: { username: user.username },
      token,
      msg: "Registration successful",
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

const isUsernameTaken = async (username) => {
  const existingUser = await User.findOne({ username });
  return existingUser ? true : false;
};

const saveUser = async (user) => {
  const newUser = new User(user);
  await newUser.save();
};

module.exports = register;
