const express = require("express");
const router = express.Router();
const { SalesController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");

router.get("/", tokenDecoder, isAdmin, SalesController.getTotalSales);
router.get("/category", tokenDecoder, isAdmin, SalesController.topCategories);
router.get("/product", tokenDecoder, isAdmin, SalesController.topProduct);

module.exports = router;
