const updateData = require("./updateData");
const listContacts = require("./listContacts");

const updateContacts = async (contactId, body) => {
  try {
    const data = await listContacts();
    const index = data.findIndex((contact) => String(contact.id) === contactId);
    if (index === -1) {
      return null;
    }
    data[index] = { ...data[index], ...body };
    await updateData(data);
    return data[index];
  } catch (error) {
    throw error;
  }
};

module.exports = updateContacts;
