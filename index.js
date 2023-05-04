const {program} = require("commander")
const { fileContacts, getContactById, removeContact, addContact } = require("./contacts");
const contacts = require("./contacts")

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const allContacts = await contacts.fileContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact);
        case "add":
            const newContsct = await contacts.addContact({name, email, phone});
            return console.log(newContsct);
        case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact);
        default: 
            return console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv)