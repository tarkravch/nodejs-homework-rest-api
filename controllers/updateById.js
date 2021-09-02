const joiContactSchema = require("../routes/api/validation");
const contactsOperations = require("../model");

const updateById = async (req, res, next) => {
  try {
    const body = req.body;
    const { contactId } = req.params;

    const { error } = joiContactSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!body) {
      return res.json({
        status: "error",
        code: 404,
        message: "missing fields",
      });
    }
    const updatedContact = await contactsOperations.updateContacts(
      contactId,
      body
    );
    if (updatedContact) {
      return res.json({ updatedContact });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
