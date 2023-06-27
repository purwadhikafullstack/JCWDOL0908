const express = require("express");
const router = express.Router();
const { AdminWarehouseController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, isSuperAdmin, AdminWarehouseController.getAllWarehouse);
router.patch("/delete/:id_warehouse", tokenDecoder, isAdmin, isSuperAdmin, AdminWarehouseController.deleteWarehouse);
router.get("/provinces", AdminWarehouseController.getProvinces);
router.get("/provinces/cities", AdminWarehouseController.getCitiesByProvinceId);
router.post("/new", tokenDecoder, isAdmin, isSuperAdmin, AdminWarehouseController.createWarehouse);
router.patch("/", tokenDecoder, isAdmin, isSuperAdmin, AdminWarehouseController.editWarehouse);

module.exports = router;
