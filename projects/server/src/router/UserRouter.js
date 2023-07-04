const express = require("express");
const router = express.Router();
const { UserController, AddressController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

// TODO : refactor route name

router.get("/", UserController.GetUser);
router.put("/bio", CheckAuth, UserController.UpdateBio);
router.put("/password", CheckAuth, UserController.UpdatePassword);
router.put("/avatar", CheckAuth, UserController.UpdateProfilePicture);
router.post("/address", CheckAuth, AddressController.SaveAddress);
router.put("/address/:address_id/default", CheckAuth, AddressController.UpdateDefaultAddress);
router.get("/address", CheckAuth, AddressController.GetUsersAddress);
router.patch("/address/:address_id", CheckAuth, AddressController.UpdateAddress);
router.delete("/address/:address_id", CheckAuth, AddressController.RemoveAddress);
router.get("/address/default", CheckAuth, AddressController.getPrimaryAddress);

module.exports = router;