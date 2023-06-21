const express = require("express");
const router = express.Router();
const { AdminController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isSuperAdmin, AdminController.getAllAdminUser);
router.get("/users", tokenDecoder, isSuperAdmin, AdminController.getAllUser);
router.get("/user/:id", tokenDecoder, isSuperAdmin, AdminController.getSingleUser);
router.get("/admin-warehouse/:id", tokenDecoder, isSuperAdmin, AdminController.getSingleWarehouseAdmin);
router.get("/warehouse/cities", tokenDecoder, isSuperAdmin, AdminController.getAllWarehouseCity);
router.get("/warehouse/city/:id_city", tokenDecoder, isSuperAdmin, AdminController.getSpecWarehouseByIdCity);
router.patch("/", tokenDecoder, isSuperAdmin, AdminController.updateAdminWarehouse);
router.patch("/user/:id", tokenDecoder, isSuperAdmin, AdminController.deleteUser);
router.post("/", tokenDecoder, isSuperAdmin, AdminController.createNewAdmin);

module.exports = router;
