const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        customerID: {
            type: mongoose.Types.ObjectId,
            require: [true, "Customer Id Need"]
        },
        customerName: String,
        customerEmail: String,
        customerPhone: String,
        total: Number,

        cart: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
