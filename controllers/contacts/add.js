const { Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const body = req.body;

    const newContact = {
      ...body,
      owner: req.user._id,
    };
    const result = await Contact.create(newContact);

    if (Object.keys(body).indexOf("favorite") === -1) {
      return res.json({ ...result, favorite: false });
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
