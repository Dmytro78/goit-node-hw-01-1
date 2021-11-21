const getAll = require("./getAll");

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

module.exports = listContacts;