const fs = require('fs').promises;
const path = require('path');

const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

async function listContacts() {
    const contacts = await getAll();
    const list = contacts.map(({ name, phone, email }) => {
      return {
        name,
        phone,
        email,
      };
    });
    console.table(list);
}

async function getContactById(contactId) {
  const contacts = await getAll();
  const selectContact = contacts.find(({ id }) => id == contactId);
  if (!selectContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  return console.table(selectContact);
}

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

async function addContact(name, email, phone) {
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };
    const contacts = await getAll();
    contacts.push(newContact);
    const updateContacts = await JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updateContacts);
    console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};