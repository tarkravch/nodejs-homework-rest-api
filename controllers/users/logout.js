const { User } = require("../../models");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(req.user._id, { token: null });

  res.json({
    status: "No content",
    code: 204,
    message: "Success logout",
  });
};

module.exports = logout;
