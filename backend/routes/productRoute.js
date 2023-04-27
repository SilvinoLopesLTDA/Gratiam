const express = require("express")
const router = express.Router()
const { createProduct } = require("../controllers/productController")
const protect = require("../middleWare/authMiddleware")

router.post("/", protect, createProduct)

module.exports = router