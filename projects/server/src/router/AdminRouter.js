const express = require("express");
const router = express.Router();
const { AdminController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isSuperAdmin, AdminController.getAllAdminUser);
router.get("/single/:name", AdminController.getMyUser);
router.get("/all-user", tokenDecoder, isSuperAdmin, AdminController.getAllUser);
router.get("/single-user", tokenDecoder, isSuperAdmin, AdminController.getSingleUser);
router.get("/single-admin-warehouse", tokenDecoder, isSuperAdmin, AdminController.getSingleWarehouseAdmin);
router.get("/warehouse/all-city", tokenDecoder, isSuperAdmin, AdminController.getAllWarehouseCity);
router.get("/warehouse/id-city", tokenDecoder, isSuperAdmin, AdminController.getSpecWarehouseByIdCity);
router.patch("/", tokenDecoder, isSuperAdmin, AdminController.updateAdminWarehouse);

module.exports = router;
