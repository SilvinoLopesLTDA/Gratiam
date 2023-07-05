const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} = require("../controllers/transactionController");

router.post("/", protect, createTransaction);
router.get("/", protect, getAllTransactions);
router.get("/:id", protect, getTransactionById);

module.exports = router;
