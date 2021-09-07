const { Contact } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const favorite = req.body.favorite;
    if (Object.keys(req.body).indexOf("favorite") === -1) {
      return res.status(400).json({
        message: "missing field favorite",
      });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { ...req.body, favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
