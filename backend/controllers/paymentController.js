const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createPayment = asyncHandler(async (req, res) => {
  const { name, description, completed } = req.body;

  //Validation
  if (!name || !description) {
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

  // Create Payment
  const payment = await Payment.create({
    user: req.user.id,
    name,
    description,
    completed,
    image: fileData,
  });
  res.status(201).json(payment);
});

// Get all Payments
const getPayments = asyncHandler(async (req, res) => {
  const payment = await Payment.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(payment);
});

// Get single Payment
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  // If payment doesn't exist
  if (!payment) {
    res.status(404);
    throw new Error("Pagamento não encontrado.");
  }
  // Match payment with User
  if (payment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Usuário não Autorizado.");
  }
  res.status(200).json(payment);
});

// Delete Payment
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  // If payment doesn't exist
  if (!payment) {
    res.status(404);
    throw new Error("Pagamento não encontrado.");
  }
  // Match payment with User
  if (payment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Pagamento Deletado com Sucesso." });
  }
  await payment.remove();
  res.status(200).json(payment);
});

// Update Payment
const updatePayment = asyncHandler(async (req, res) => {
  const { name, description, completed } = req.body;
  const { id } = req.params;
  const payment = await Payment.findById(id);

  // If payment doesn't exist
  if (!payment) {
    res.status(404);
    throw new Error("Pagamento não encontrado.");
  }

  // Match payment to the User
  if (payment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error({ message: "Pagamento Deletado com Sucesso." });
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

  // Update Payment
  const updatedPayment = await Payment.findByIdAndUpdate(
    { _id: id },
    {
      name,
      description,
      completed,
      image: Object.keys(fileData).length === 0 ? payment?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedPayment);
});

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  deletePayment,
  updatePayment,
};