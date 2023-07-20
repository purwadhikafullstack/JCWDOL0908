const express = require("express");
const router = express.Router();
const { ProductWarehouseRltController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, ProductWarehouseRltController.getTotalStockProducts);
router.get("/:id_product", tokenDecoder, isAdmin, ProductWarehouseRltController.getStockProduct);
router.get(
  "/:id_product/warehouses",
  tokenDecoder,
  isAdmin,
  ProductWarehouseRltController.getWarehouseWhichProvideProduct,
);
router.patch("/:id_product", tokenDecoder, isAdmin, ProductWarehouseRltController.updateStock);
router.post("/:id_product", tokenDecoder, isAdmin, ProductWarehouseRltController.createStock);
router.patch("/:id_product/delete", tokenDecoder, isAdmin, ProductWarehouseRltController.deleteStock);
router.get("/:id_warehouse/products", tokenDecoder, isAdmin, ProductWarehouseRltController.getSetOfProductsInWarehouse);

module.exports = router;
