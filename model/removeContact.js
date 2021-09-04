const listContacts = require("./listContacts");

const updateData = require("./updateData");

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((contact) => String(contact.id) === contactId);
    if (index === -1) {
      return null;
    }
    const newContacts = data.filter(
      (contact) => String(contact.id) !== contactId
    );
    await updateData(newContacts);
    return data[index];
  } catch (error) {
    throw error;
  }
};

module.exports = removeContact;
