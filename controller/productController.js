const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");



//@GET api/products
//@access public
const getProducts = asyncHandler(async (req, res) =>
{
    const product = await Product.find();
    res.status(200).json(product);
});

//@Desc Create New Product
//@POST api/products
//@access public
const createProduct = asyncHandler(async (req, res) =>
{

    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    console.log(req.body)
    const product = await Product.create({
        name,
        price,
        quantity,
    });
    res.status(201).json(product);
});

//@Desc Get Product
//@GET api/users/:id
//@access public
const getProduct = asyncHandler(async (req, res) =>
{
    const product = await Product.findById(req.params.id);
    if (!product)
    {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
});

//@Desc Update Product
//@PUT api/users/:id
//@access public
const updateProduct = asyncHandler(async (req, res) =>
{
    const product = await Product.findById(req.params.id);
    if (!product)
    {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedProduct);
});

//@Desc Delete Product
//@DELETE api/users/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) =>
{
    const product = await Product.findById(req.params.id);
    if (!product)
    {
        res.status(404);
        throw new Error("Product not found");
    }
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json(removedProduct);
});

module.exports = { getProducts, createProduct, getProduct, updateProduct, deleteProduct };