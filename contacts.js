const {nanoid} = require("nanoid")
const fs = require("fs/promises");
const path = require("path");

const relativePath = "./db/contacts.json";

const contactsPath = path.resolve(relativePath);

const fileContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contacts = await fileContacts();
    const contact = contacts.find((item) => item.id === contactId);
        if (contact) {
      return contact || null;
        }
};

const removeContact = async (id) => {
    const contacts = await fileContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1){
      return null
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

const addContact = async (data) => {
    const contacts = await fileContacts()
    const newContact = { id: nanoid(), ...data,};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

module.exports = {
  fileContacts,
  getContactById,
  removeContact,
  addContact
};
