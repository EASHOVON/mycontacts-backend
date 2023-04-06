const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@Desc Get all contacts
//@GET api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) =>
{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@Desc Create New contacts
//@POST api/contacts
//@access public
const createContact = asyncHandler(async (req, res) =>
{
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@Desc Get Contact
//@GET api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) =>
{
    const contact = await Contact.findById(req.params.id);
    if (!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});

//@Desc Update Contact
//@PUT api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) =>
{
    const contact = await Contact.findById(req.params.id);
    if (!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    res.status(200).json(updatedContact);
});

//@Desc Delete Contact
//@DELETE api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) =>
{
    const contact = await Contact.findById(req.params.id);
    if (!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }
    const removedContact = await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(removedContact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };