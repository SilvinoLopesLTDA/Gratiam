const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, cost, price, colors, description } = req.body;

  //Validation
  if (!name || !category || !quantity || !cost || !price) {
    res.status(400);
    throw new Error("Por favor, preencha os campos corretamente!");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Sistema Gratidão",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Upload da Imagem Falhou, tente novamente.");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    cost,
    price,
    colors,
    description,
    image: fileData,
  });
  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get single Product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }
  // Match product with User
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Usuário não Autorizado.");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }
  // Match product with User
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Produto Deletado com Sucesso." });
  }
  await product.remove();
  res.status(200).json(product);
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, cost, price, colors, description } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);

  // If product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }

  // Match product to the User
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Produto Deletado com Sucesso." });
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Sistema Gratidão",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Upload da Imagem Falhou, tente novamente.");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      cost,
      price,
      colors,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
