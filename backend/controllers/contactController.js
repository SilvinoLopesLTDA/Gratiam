const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("Usuário não encontrado. Por favor, Entre em sua Conta.");
  }

  // Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Por favor, preencha os campos corretamente.");
  }

  const send_to = process.env.EMAIL_USER;
  const send_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, send_from, reply_to);
    res.status(200).json({ success: true, message: "Email Enviado." });
  } catch (error) {
    res.status(500);
    throw new Error("Email não enviado. Por favor, tente novamente!");
  }
});

module.exports = {
  contactUs,
};
