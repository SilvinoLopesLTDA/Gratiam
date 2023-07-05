const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");

exports.updateStockAPI = async (cartItems) => {
  // Iterar sobre os itens do carrinho
  for (const item of cartItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error(`Produto não encontrado: ${item.product}`);
    }

    // Verificar se há quantidade suficiente do produto disponível
    if (product.quantity < item.quantity) {
      throw new Error(`Quantidade insuficiente do produto: ${item.product}`);
    }

    // Atualizar a quantidade disponível do produto
    product.quantity -= item.quantity;
    await product.save();
  }
};

exports.registerTransactionAPI = async (transactionData) => {
  try {
    // Crie uma nova instância do modelo Transaction com os dados da transação
    const newTransaction = new Transaction(transactionData);

    // Salve a transação no banco de dados
    const savedTransaction = await newTransaction.save();

    // Retorne a transação salva ou faça qualquer processamento adicional necessário
    return savedTransaction;
  } catch (error) {
    // Lide com erros, por exemplo, registre em log, envie uma notificação, etc.
    throw new Error("Falha ao registrar a transação.");
  }
};
