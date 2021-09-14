const fs = require("fs/promises");
const path = require("path");
const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const Jimp = require("jimp");

const usersDir = path.join(__dirname, "../../", "public/avatars");

const updateImg = async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  const { path: tempPath, originalname } = req.file;
  const user = await User.findOne({ token });
  if (!user || bearer !== "Bearer") {
    throw Unauthorized("Not authorized");
  }

  const id = String(user._id);

  const extension = originalname.split(".")[1];
  const avatarFileName = user.email.split("@")[0] + "." + extension;
  const uploadPath = path.join(usersDir, id, avatarFileName);
  const file = await Jimp.read(tempPath);
  await file.resize(255, 255).write(tempPath);
  await fs.rename(tempPath, uploadPath);

  const image = `avatars/${id}/${avatarFileName}`;
  await User.findByIdAndUpdate(id, { image });
  res.json({
    status: "success",
    code: 200,
    data: {
      avatarUrl: image,
    },
  });
  if (!image) {
    await fs.unlink(tempPath);
  }
};

module.exports = updateImg;
