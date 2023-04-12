const express = require("express");
const router = express.Router();
const {
    getOrders,
    createOrder
} = require("../controller/orderController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getOrders).post(createOrder);


module.exports = router;
