const contactsOperations = require("../model");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsOperations.getContactById(id);
    if (contact) {
      return res.json({ contact });
    } else {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
