const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");

router.get("/", UserController.GetUser)


module.exports = router;