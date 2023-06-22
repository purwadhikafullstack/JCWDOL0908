const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller");

router.get("/", ProductController.listProducts);

module.exports = router;
