const express = require("express");
const router = express.Router();
const { AddressController } = require("../controller");

router.get("/provinces", AddressController.GetProvinces);
router.get("/cities/:province_id", AddressController.GetCity);

module.exports = router;