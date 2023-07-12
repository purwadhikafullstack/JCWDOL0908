const express = require("express");
const router = express.Router();
const { AdminController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getAllAdminUser);
router.get("/users", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getAllUser);
router.get("/user/:id", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getSingleUser);
router.get("/admin-warehouse/:id", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getSingleWarehouseAdmin);
router.get("/warehouse/cities", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getAllWarehouseCity);
router.get("/warehouse/city/:id_city", tokenDecoder, isAdmin, isSuperAdmin, AdminController.getSpecWarehouseByIdCity);
router.patch("/", tokenDecoder, isAdmin, isSuperAdmin, AdminController.updateAdminWarehouse);
router.patch("/user/:id", tokenDecoder, isAdmin, isSuperAdmin, AdminController.deleteUser);
router.post("/", tokenDecoder, isAdmin, isSuperAdmin, AdminController.createNewAdmin);

module.exports = router;
