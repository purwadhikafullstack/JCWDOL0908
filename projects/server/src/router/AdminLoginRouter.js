const express = require("express");
const router = express.Router();
const { AdminLoginController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");

router.post("/", AdminLoginController.loginAdmin);
router.post("/keep-logged", tokenDecoder, isAdmin, AdminLoginController.keepLogin);

module.exports = router;
