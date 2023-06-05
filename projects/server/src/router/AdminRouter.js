const express = require("express");
const router = express.Router();
const { AdminController } = require("../controller");

router.get("/", AdminController.GetAllUser);

module.exports = router;
