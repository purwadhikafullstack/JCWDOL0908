const express = require("express");
const router = express.Router();
const { AdminLoginController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");

router.post("/", AdminLoginController.loginAdmin);
router.post("/keep-logged", tokenDecoder, AdminLoginController.keepLogin);

module.exports = router;
