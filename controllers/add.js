const { Contact } = require("../models");

const add = async (req, res, next) => {
  try {
    const body = req.body;
    const newContact = await Contact.create(body);
    if (Object.keys(body).indexOf("favorite") === -1) {
      return res.json({ ...newContact, favorite: false });
    }
    return res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
