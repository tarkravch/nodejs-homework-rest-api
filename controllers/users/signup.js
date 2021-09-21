const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const usersDir = path.join(__dirname, "../../", "public/avatars");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendMail } = require("../../utils");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const defaultImg = gravatar.url(email);
  const newUser = new User({
    email,
    password: hashPassword,
    verificationToken: v4(),
    avatarUrl: `http:${defaultImg}`,
  });
  const id = newUser._id.toString();

  await fs.mkdir(path.join(usersDir, id));
  await newUser.save();

  const { verificationToken } = newUser;
  const data = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите регистрацию</a>`,
  };

  await sendMail(data);

  res.status(201).json({
    status: "created",
    code: 201,
    message: "Success signup",
  });
};

module.exports = signup;
