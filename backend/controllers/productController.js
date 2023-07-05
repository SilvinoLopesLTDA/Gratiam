const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Client = require("../models/clientsModel");
const { updateStockAPI, registerTransactionAPI } = require("../api/cartAPI");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, cost, price, colors, description } =
    req.body;

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
  const { name, category, quantity, cost, price, colors, description } =
    req.body;
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

// Adicionar produto ao carrinho
const addToCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }

  const userId = req.user._id; // Identificador único do usuário (você precisa definir a lógica de autenticação e obtenção do ID do usuário)

  // Verificar se o carrinho do usuário já existe no banco de dados
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // Se o carrinho não existir, crie um novo
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  // Verificar se o produto já está presente no carrinho
  const cartItem = cart.items.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (cartItem) {
    // Se o produto já estiver no carrinho, atualize apenas a quantidade
    cartItem.quantity += 1;
  } else {
    // Se o produto não estiver no carrinho, adicione-o com a quantidade 1
    if (product.quantity > 0) {
      // Verificar se a quantidade do produto é maior que zero
      cart.items.push({
        product: product,
        quantity: 1,
      });
    } else {
      res.status(400);
      throw new Error("Produto indisponível!");
    }
  }

  // Salve as alterações no carrinho
  await cart.save();

  // Busque novamente o carrinho com a população do produto
  cart = await Cart.findById(cart._id).populate("items.product");

  res.status(200).json({ message: "Produto adicionado ao carrinho." });
});

// Obter os itens do carrinho
const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Identificador único do usuário (você precisa definir a lógica de autenticação e obtenção do ID do usuário)

  // Verificar se o carrinho do usuário existe no banco de dados
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    res.status(404);
    throw new Error("Carrinho não encontrado.");
  }

  // Obter os itens do carrinho
  const cartItems = cart.items;

  res.status(200).json(cartItems);
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Identificador único do usuário (você precisa definir a lógica de autenticação e obtenção do ID do usuário)

  // Verificar se o carrinho do usuário existe no banco de dados
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error("Carrinho não encontrado.");
  }

  // Limpar o carrinho (remover todos os itens)
  cart.items = [];

  // Salvar as alterações no carrinho
  await cart.save();

  res.status(200).json({ message: "Carrinho limpo com sucesso." });
});

const removeCartItemQt = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Identificador único do usuário (você precisa definir a lógica de autenticação e obtenção do ID do usuário)

  // Verificar se o carrinho do usuário existe no banco de dados
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error("Carrinho não encontrado.");
  }

  // Encontrar o item do carrinho com base no ID do produto
  const cartItem = cart.items.find((item) => item.product.toString() === id);

  if (!cartItem) {
    res.status(404);
    throw new Error("Produto não encontrado no carrinho.");
  }

  // Verificar se a quantidade do item é maior que 1
  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1; // Remover uma unidade da quantidade
  } else {
    // Se a quantidade for igual a 1, remover o item do carrinho
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === id
    );
    cart.items.splice(cartItemIndex, 1);
  }

  // Salvar as alterações no carrinho
  await cart.save();

  res.status(200).json({ message: "Unidade de produto removido do carrinho." });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Identificador único do usuário (você precisa definir a lógica de autenticação e obtenção do ID do usuário)

  // Verificar se o carrinho do usuário existe no banco de dados
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    res.status(404);
    throw new Error("Carrinho não encontrado.");
  }

  // Encontrar o item do carrinho com base no ID do produto
  const cartItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === id
  );

  if (cartItemIndex === -1) {
    res.status(404);
    throw new Error("Produto não encontrado no carrinho.");
  }

  // Remover o item do carrinho
  cart.items.splice(cartItemIndex, 1);

  // Salvar as alterações no carrinho
  await cart.save();

  res.status(200).json({ message: "Produto removido do carrinho." });
});

// Efetuar o pagamento do carrinho
const checkout = asyncHandler(async (req, res) => {
  const { clientId, paymentMethod, totalAmount } = req.body;
  const userId = req.user._id;

  if (!userId || !clientId || !paymentMethod || !totalAmount) {
    res.status(400);
    throw new Error("Por favor, preencha os campos corretamente!");
  }

  // Encontre o carrinho do usuário no banco de dados
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Carrinho vazio.");
  }

  // Carregar o cliente do banco de dados usando o ID do cliente
  const client = await Client.findById(clientId);

  if (!client) {
    res.status(404);
    throw new Error("Cliente não encontrado.");
  }

  // Obtenha os itens do carrinho
  const cartItems = cart.items;

  try {
    // Atualize o estoque dos produtos no carrinho
    await updateStockAPI(cartItems);

    // Registrar a transação de pagamento
    const transactionData = {
      user: userId,
      client: {
        _id: client._id,
        name: client.name,
        isMember: client.isMember,
        createdAt: client.createdAt,
      },
      items: cartItems.map((item) => ({
        product: {
          _id: item.product._id,
          name: item.product.name,
        },
        quantity: item.quantity,
      })),
      paymentMethod: paymentMethod,
      totalAmount: totalAmount,
    };

    await registerTransactionAPI(transactionData);

    // Limpe o carrinho
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Pagamento efetuado com sucesso." });
  } catch (error) {
    res.status(500);
    throw new Error("Falha ao efetuar o pagamento.");
  }
});

// Duplicar um produto existente
const duplicateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Encontre o produto a ser duplicado
  const productToDuplicate = await Product.findById(id);

  if (!productToDuplicate) {
    res.status(404);
    throw new Error("Produto não encontrado.");
  }

  // Crie um novo objeto com base no produto existente
  const duplicatedProduct = new Product({
    user: productToDuplicate.user,
    name: productToDuplicate.name,
    sku: productToDuplicate.sku,
    category: productToDuplicate.category,
    quantity: productToDuplicate.quantity,
    cost: productToDuplicate.cost,
    price: productToDuplicate.price,
    colors: productToDuplicate.colors,
    description: productToDuplicate.description,
    image: productToDuplicate.image,
  });

  // Salve o produto duplicado no banco de dados
  const savedProduct = await duplicatedProduct.save();

  res.status(201).json(savedProduct);
});

module.exports = {
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
  duplicateProduct,
};
