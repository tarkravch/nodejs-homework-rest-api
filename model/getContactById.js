const listContacts = require("./listContacts");
const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const result = data.find((contact) => String(contact.id) === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = getContactById;
