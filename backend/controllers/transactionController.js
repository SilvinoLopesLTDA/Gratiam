const Transaction = require("../models/transactionModel");

// Criar uma nova transação
const createTransaction = async (req, res) => {
  try {
    const { items, paymentMethod, totalAmount } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      items,
      paymentMethod,
      totalAmount,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao criar a transação." });
  }
};

// Obter todas as transações
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort(
      "-createdAt"
    );

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao obter as transações." });
  }
};

// Obter uma transação por ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

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
