import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/transactions/`;

// Get all payments
const getAllTransactions = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Get a payment
const getTransactionById = async (id) => {
  const response = await axios.get(`${API_URL + id}`);
  return response.data;
};

const paymentService = {
  getAllTransactions,
  getTransactionById,
};

export default paymentService;
