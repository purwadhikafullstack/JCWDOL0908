const express = require("express");
const router = express.Router();
const { UserController, AddressController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.get("/", UserController.GetUser);
router.put("/update-bio", CheckAuth, UserController.UpdateBio);
router.put("/update-password", CheckAuth, UserController.UpdatePassword);
router.put("/update-avatar", CheckAuth, UserController.UpdateProfilePicture);
router.post("/address", CheckAuth, AddressController.SaveAddress);
router.put("/address/:address_id/default", CheckAuth, AddressController.UpdateDefaultAddress);

module.exports = router;