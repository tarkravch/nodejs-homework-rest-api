const fs = require("fs/promises");

const filePath = require("./filePath");

const updateData = async (contacts) => {
  const normalizedContacts = JSON.stringify(contacts);
  await fs.writeFile(filePath, normalizedContacts);
};

module.exports = updateData;
