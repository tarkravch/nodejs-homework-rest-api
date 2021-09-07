const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = new User({ email });
  newUser.setPassword(hashPassword);
  await newUser.save();

  res.status(201).json({
    status: "created",
    code: 201,
    message: "Success signup",
  });
};

module.exports = signup;
