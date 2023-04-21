const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");



//@Desc Register a user
//@GET api/users/register 
//@access public
const registerUser = asyncHandler(async (req, res) =>
{
    const { username, email, password } = req.body;
    if (!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable)
    {
        res.status(400);
        throw new Error("User Already Register!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user)
    {
        res.status(201).json({ _id: user.id, email: user.email, password: hashedPassword })
    } else
    {
        res.status(400);
        throw new Error("User data is not valid!");
    }


    res.json({ message: "Register the user" });
});



//@Desc Login a user
//@GET api/users/login 
//@access public
const loginUser = asyncHandler(async (req, res) =>
{
    const { email, password } = req.body;
    if (!email || !password)
    {
        res.status(400);
        throw new Error("All Fields are mendatory!");
    }
    const user = await User.findOne({ email });
    //  Compare password
    if (user && (await bcrypt.compare(password, user.password)))
    {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        )
        res.status(200).json({ accessToken });
    } else
    {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});



//@Desc Current user Info
//@GET api/users/current 
//@access public
const currentUser = asyncHandler(async (req, res) =>
{
    res.json(req.user);
});



//@Desc Get all users
//@GET api/users
//@access public
const getUsers = asyncHandler(async (req, res) =>
{
    const contacts = await User.find();
    res.status(200).json(contacts);
});

//@Desc Create New user
//@POST api/users
//@access public
const createUser = asyncHandler(async (req, res) =>
{
    const { name, email, phone } = req.body;
    if (!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await User.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
});

//@Desc Get User
//@GET api/users/:id
//@access public
const getUser = asyncHandler(async (req, res) =>
{
    const user = await User.findById(req.params.id);
    if (!user)
    {
        res.status(404);
        throw new Error("User not found")
    }
    res.status(200).json(user);
});

//@Desc Update User
//@PUT api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) =>
{
    const contact = await User.findById(req.params.id);
    if (!contact)
    {
        res.status(404);
        throw new Error("User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );
    res.status(200).json(updatedUser);
});

//@Desc Delete User
//@DELETE api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) =>
{
    const contact = await User.findById(req.params.id);
    if (!contact)
    {
        res.status(404);
        throw new Error("User not found")
    }
    const removedUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(removedUser);
});

module.exports = { registerUser, loginUser, currentUser };