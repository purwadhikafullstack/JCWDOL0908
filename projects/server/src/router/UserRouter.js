const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.get("/", UserController.GetUser)
router.put("/update-bio", CheckAuth,UserController.UpdateBio)


module.exports = router;