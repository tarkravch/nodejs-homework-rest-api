const { Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const body = req.body;
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (updatedContact) {
      return res.json({ updatedContact });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
