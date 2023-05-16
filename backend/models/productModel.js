const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Por favor, Adcione um Nome"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      default: "SKU",
    },
    category: {
      type: String,
      required: [true, "Por favor, Adcione uma Categoria"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Por favor, Adcione uma Quantidade"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Por favor, Adcione um Preço"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Por favor, Adcione uma Descrição"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
