const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
// const getTotal = require("../utils/getTotalHelper");


// Helper func

const getTotal = async (cart, cb) =>
{
    const promise = new Promise((resolve, reject) =>
    {
        let totalAmount = 0;
        cart.forEach((element, index) =>
        {

            const product = Product.findById(element.id);
            // console.log("product: ", product)
            if (!product)
            {
                res.status(404);
            }
            product.then((product) =>
            {
                totalAmount = totalAmount + (product.price * element.quantity);
                console.log(totalAmount)
                if (index + 1 == cart.length)
                {
                    resolve(totalAmount);
                }
            })

            // console.log(totalAmount);
            // totalPrice += product.price * element.quantity;
            // product.quantity -= element.quantity;
            // console.log(element, product);

        });

    });

    promise.then(total =>
    {
        console.log("Total:", total);
        cb(total);
    });
}


//@Desc Get all orders
//@GET api/orders
//@access public
const getOrders = asyncHandler(async (req, res) =>
{
    const orders = await Order.find();
    res.status(200).json(orders);
});




//@Desc Create New order
//@POST api/orders
//@access publicP
const createOrder = asyncHandler(async (req, res) =>
{
    const { customerID, cart } = req.body;
    // console.log(cart);

    if (!customerID || !cart) 
    {
        res.status(400);
        throw new Error("All Fields are Mendetory!")

    } else
    {
        // let totalAmount = 0;
        // let totalQuantity = 0;
        // const result = await getTotal(cart)
        // res.status(201).json(result);
        try
        {
            const user = await User.findById(customerID);
            // console.log("user: ", user);

            if (!user)
            {
                res.status(404);
            }


            let totalPrice = await getTotal(cart, (total) =>
            {

                const order = {
                    userID: customerID,
                    cart: cart,
                    totalPrice: total
                }
                // console.log("order:", order)
                res.status(201).json(order);
            });

        }
        catch (err)
        {
            console.log(err)
            res.json(err);
            throw new Error(err);
        }
    }
});


module.exports = { getOrders, createOrder };