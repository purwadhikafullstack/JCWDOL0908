const express = require("express");
const router = express.Router();
const { AdminTransactionController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, AdminTransactionController.getUserTransactions);
router.patch("/:id_transaction/reject", tokenDecoder, isAdmin, AdminTransactionController.rejectPayment);
router.patch("/:id_transaction/approve", tokenDecoder, isAdmin, AdminTransactionController.approvePayment);
router.patch("/:id_transaction/cancel", tokenDecoder, isAdmin, AdminTransactionController.cancelOrder);
router.post("/:id_transaction/auto-mutation", tokenDecoder, isAdmin, AdminTransactionController.autoMutation);
router.post("/:id_transaction/send-order", tokenDecoder, isAdmin, AdminTransactionController.sendOrder);

module.exports = router;
