const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Product"
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  client: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    ref: "Client",
  },
  paymentMethod: {
    type: String,
    enum: ["Débito", "Crédito", "Dinheiro", "Pix"],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
