const contactsOperations = require("../model");

const getAll = async (req, res, next) => {
	try {
		const contacts = await contactsOperations.listContacts();
		return res.json({contacts});
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
