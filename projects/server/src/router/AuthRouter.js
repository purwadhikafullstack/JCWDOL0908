const express = require("express");
const router = express.Router();

const { AuthController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.post("/register", AuthController.RegisterUser);
router.put("/verify", AuthController.VerifyUser);
router.post("/", AuthController.AuthUser);
router.get("/keep-login", CheckAuth, AuthController.KeepLogin);

module.exports = router;