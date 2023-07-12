const express = require("express");
const router = express.Router();
const { MutationController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isAdmin, MutationController.createNewMutationRequest);
router.get("/", tokenDecoder, isAdmin, MutationController.fetchMutationRequests);
router.patch("/approve", tokenDecoder, isAdmin, MutationController.approvingMutationRequests);
router.patch("/reject", tokenDecoder, isAdmin, MutationController.rejectMutationRequests);
router.patch("/accept", tokenDecoder, isAdmin, MutationController.acceptOnDeliveredProduct);

module.exports = router;
