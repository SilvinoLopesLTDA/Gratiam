const Transaction = require("../models/transactionModel");

// Criar uma nova transação
const createTransaction = async (req, res) => {
  try {
    const { user, items, paymentMethod, totalAmount } = req.body;

    const transaction = new Transaction({
      user,
      items,
      paymentMethod,
      totalAmount,
    });
    console.log(transaction);

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao criar a transação." });
  }
};

// Obter todas as transações
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user", "name"); // Popula a referência ao usuário com o campo "name"

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao obter as transações." });
  }
};

// Obter uma transação por ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id).populate("user", "name"); // Popula a referência ao usuário com o campo "name"

    if (!transaction) {
      res.status(404).json({ error: "Transação não encontrada." });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao obter a transação." });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};
