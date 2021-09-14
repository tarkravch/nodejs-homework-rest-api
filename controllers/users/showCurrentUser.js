const { User } = require("../../models");
const { Unauthorized } = require("http-errors");

const showCurrentUser = async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  const user = await User.findOne({ token });

  if (!user || bearer !== "Bearer") {
    throw Unauthorized("Not authorized");
  }
  const { email, subscription } = user;

  res.status(200).json({
    status: "OK",
    data: {
      email,
      subscription,
    },
  });
};

module.exports = showCurrentUser;
