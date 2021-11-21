const fs = require('fs').promises;
const contactsPath = require("./contactsPath");
const getAll = require("./getAll");

async function removeContact(contactId) {
    const contacts = await getAll();
    const idx = contacts.findIndex(({ id }) => id == contactId);
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newContacts = contacts.filter(({ id }) => id != contactId);
    const updateContacts = await JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, updateContacts);
    console.table(newContacts);
}

module.exports = removeContact;