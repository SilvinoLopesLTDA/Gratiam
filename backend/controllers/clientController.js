const asyncHandler = require("express-async-handler");
const Client = require("../models/clientsModel");

// Register Client
const registerClient = asyncHandler(async (req, res) => {
  const { name, phone, email, isMember } = req.body;

  // Validation
  if (!name || !isMember) {
    res.status(400);
    throw new Error("Preencha os campos corretamente.");
  }

  // Check if user email already exist
  const clientExists = await Client.findOne({ email });

  if (clientExists) {
    res.status(400);
    throw new Error("O email já está cadastrado!");
  }

  // Create new user
  const client = await Client.create({
    user: req.user.id,
    name,
    phone,
    email,
    isMember,
  });

  if (client) {
    const { _id, name, email, phone, isMember } = client;
    res.status(201).json({
      _id,
      name,
      phone,
      email,
      isMember,
    });
  } else {
    res.status(400);
    throw new Error("Dados do cliente invalidos!");
  }
});

// Get all client
const getClients = asyncHandler(async (req, res) => {
  const client = await Client.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(client);
});

// Get single client
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // If client doesn't exist
  if (!client) {
    res.status(404);
    throw new Error("Cliente não encontrado.");
  }
  // Match client with User
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Cliente não Autorizado.");
  }
  res.status(200).json(client);
});

// Update Client
const updateClient = asyncHandler(async (req, res) => {
  const { name, email, phone, isMember } = req.body;
  const { id } = req.params;

  const client = await Client.findById(id);

  // If client doesn't exist
  if (!client) {
    res.status(404);
    throw new Error("Cliente não encontrado!");
  }

  // Match product to the User
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Cliente Deletado com Sucesso." });
  }

  // Update Client
  const updatedClient = await Client.findByIdAndUpdate(
    { _id: id },
    {
      name,
      email,
      phone,
      isMember,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedClient);
});

// Delete Client
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  // If client doesn't exist
  if (!client) {
    res.status(404);
    throw new Error("Cliente não encontrado.");
  }
  // Match client with User
  if (client.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Cliente Deletado com Sucesso." });
  }
  await client.remove();
  res.status(200).json(client);
});

module.exports = {
  registerClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
