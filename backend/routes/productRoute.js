const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  addToCart,
  getCartItems,
  clearCart,
  removeCartItemQt,
  removeCartItem,
  checkout,
  duplicateProduct
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createProduct);
router.post("/add-cart/:id", protect, addToCart);
router.get("/cart", protect, getCartItems);
router.post("/clear-cart", protect, clearCart);
router.post("/remove-itemqt/:id", protect, removeCartItemQt);
router.post("/remove-item/:id", protect, removeCartItem);
router.post("/checkout", protect, checkout);
router.post("/duplicate/:id", protect, duplicateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.delete("/:id", protect, deleteProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);

module.exports = router;
