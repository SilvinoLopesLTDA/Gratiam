const express = require("express")
const router = express.Router()
const protect = require("../middleWare/authMiddleware")
const { contactUs } = require("../controllers/contactController")

router.get("/", protect, contactUs)

module.exports = router