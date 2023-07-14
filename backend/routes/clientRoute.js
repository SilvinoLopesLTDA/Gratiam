const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  registerClient,
  getClients,
  getClient,
  updateClient,
  deleteClient
} = require("../controllers/clientController");

router.post("/", protect, registerClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClient);
router.patch("/:id", protect, updateClient);
router.delete("/:id", protect, deleteClient);

module.exports = router;
