//@Desc Get all contacts
//@GET api/contacts
//@access public
const getContacts = (req, res) =>
{
    res.status(200).json({ message: "Get All Contacts!" });
};

//@Desc Create New contacts
//@POST api/contacts
//@access public
const createContact = (req, res) =>
{
    res.status(201).json({ message: "Create Contacts!" });
};

//@Desc Get Contact
//@GET api/contacts/:id
//@access public
const getContact = (req, res) =>
{
    res.status(200).json({ message: `Get Contact for ${ req.params.id }` });
};

//@Desc Update Contact
//@PUT api/contacts/:id
//@access public
const updateContact = (req, res) =>
{
    res.status(200).json({ message: `Update Contact for ${ req.params.id }` });
};

//@Desc Delete Contact
//@DELETE api/contacts/:id
//@access public
const deleteContact = (req, res) =>
{
    res.status(200).json({ message: `Delete Contact for ${ req.params.id }` });
};

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };