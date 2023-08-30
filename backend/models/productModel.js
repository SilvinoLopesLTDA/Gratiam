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
      required: [true, "Por favor, Adicione um Nome!"],
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
      required: [true, "Por favor, Adicione uma Categoria!"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Por favor, Adicione uma Quantidade!"],
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, "Por favor, Adicione o Custo do produto!"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Por favor, Adicione um Preço!"],
      trim: true,
    },
    colors: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: "Nenhuma descrição informada",
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
