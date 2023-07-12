const express = require("express");
const router = express.Router();
const { CartController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.post("/", CheckAuth, CartController.AddToCart);
router.delete("/:id_product", CheckAuth, CartController.RemoveFromCart);
router.get("/", CheckAuth, CartController.GetCart);

module.exports = router;
