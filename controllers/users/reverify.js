const { NotFound } = require("http-errors");
const { v4 } = require("uuid");
const { sendMail } = require("../../utils");
const { User } = require("../../models");

const reverify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: v4(),
  });
  const { verificationToken } = user;
  const data = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите регистрацию</a>`,
  };

  await sendMail(data);
  res.status(200).json({
    message: "Verification email sent",
  });

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    status: "OK",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = reverify;
