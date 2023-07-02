const express = require("express");
const router = express.Router();
const { CheckoutController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.post("/shipping-cost", CheckAuth, CheckoutController.checkShippingCoast);


module.exports = router;