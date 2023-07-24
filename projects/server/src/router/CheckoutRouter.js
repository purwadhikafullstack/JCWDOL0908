const express = require("express");
const router = express.Router();
const { CheckoutController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.post("/shipping-cost", CheckAuth, CheckoutController.checkShippingCoast);
router.post("/", CheckAuth, CheckoutController.createOrder);
router.get("/history", CheckAuth, CheckoutController.getOrders);
router.put("/payment/:id", CheckAuth, CheckoutController.payOrder);
router.put("/accept/:id", CheckAuth, CheckoutController.acceptTransaction);
router.put("/cancel/:id", CheckAuth, CheckoutController.cancelTransaction);


module.exports = router;