const { Contact } = require("../models");

const delById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: contact,
      });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = delById;
