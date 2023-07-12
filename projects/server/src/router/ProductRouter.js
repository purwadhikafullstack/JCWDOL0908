const express = require("express");
const router = express.Router();
const { ProductController, ProductWarehouseRltController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/client", ProductController.listProducts);
router.get("/:id", ProductController.getProduct);
router.post("/", tokenDecoder, isAdmin, isSuperAdmin, ProductController.postNewProduct);
router.get("/", tokenDecoder, isUser, ProductController.getProducts);
router.patch("/delete/:id_product", tokenDecoder, isAdmin, isSuperAdmin, ProductController.deleteProduct);
router.patch("/edit/:id_product", tokenDecoder, isAdmin, isSuperAdmin, ProductController.editProduct);

module.exports = router;
