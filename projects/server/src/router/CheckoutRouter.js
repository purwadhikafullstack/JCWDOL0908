const express = require("express");
const router = express.Router();
const { CheckoutController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.post("/shipping-cost", CheckAuth, CheckoutController.checkShippingCoast);
router.post("/", CheckAuth, CheckoutController.createOrder);
router.get("/history", CheckAuth, CheckoutController.getOrders);
router.patch("/payment/:id", CheckAuth, CheckoutController.payOrder);


module.exports = router;