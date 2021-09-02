const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const updateData = require("./updateData");

const addContact = async (data) => {
  try {
    const newContact = { ...data, id: v4() };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateData(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = addContact;
