const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");
const User = require("../../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid username or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid username or password");
  }

  try {
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        username: user.username,
      },
      token,
      msg: "Login successful",
    });
  } catch (err) {
    console.error(err);
    throw new InternalServerError(err.message);
  }
};

module.exports = login;
