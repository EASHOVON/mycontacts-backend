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
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
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