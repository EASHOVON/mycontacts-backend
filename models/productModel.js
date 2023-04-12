const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Product Name Required"]
    },
    price: {
        type: Number,
        require: [true, "Product Price Required"]
    },
    quantity: {
        type: Number,
        require: [true, "Product Quantity Required"]
    },
});




module.exports = mongoose.model("Product", ProductSchema);