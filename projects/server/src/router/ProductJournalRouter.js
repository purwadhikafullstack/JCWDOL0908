const express = require("express");
const router = express.Router();
const { ProductJournalController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, ProductJournalController.getJournals);
router.get(
  "/:id_product/product/:id_warehouse/warehouse",
  tokenDecoder,
  isAdmin,
  ProductJournalController.getDetailProductJournalOnAWarehouse,
);

module.exports = router;
