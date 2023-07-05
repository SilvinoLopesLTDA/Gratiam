const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const clientsSchema = new mongoose.Schema(
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
    email: {
      type: String,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Por favor adcione um email valido",
      ],
    },
    isMember: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Clients = mongoose.model("Clients", clientsSchema);

module.exports = Clients;
