const getAll = require("./getAll");

async function getContactById(contactId) {
  const contacts = await getAll();
  const selectContact = contacts.find(({ id }) => id == contactId);
  if (!selectContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  return console.table(selectContact);
}

module.exports = getContactById;