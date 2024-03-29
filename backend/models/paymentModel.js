const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "+55",
    },
    description: {
      type: String,
      required: true,
      default: "Nenhuma descrição informada",
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    expirateDate: {
      type: Date,
      required: true,
      default: function () {
        return new Date();
      },
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
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

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
