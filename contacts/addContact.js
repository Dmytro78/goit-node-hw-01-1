const fs = require('fs').promises;
const path = require('path');

const getAll = require("./getAll");
const contactsPath = require("./contactsPath");

const { v4 } = require('uuid');

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

module.exports = addContact;