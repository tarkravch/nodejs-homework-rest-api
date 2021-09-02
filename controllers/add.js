const joiContactSchema = require("../routes/api/validation");
const contactsOperations = require("../model");

const add = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = joiContactSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (!body) {
      return res.json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const newContact = await contactsOperations.addContact(body);
    return res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
