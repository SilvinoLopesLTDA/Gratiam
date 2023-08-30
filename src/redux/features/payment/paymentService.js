import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/payments/`;

// Create New Payment
const createPayment = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data;
};

// Get all payments
const getPayments = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Delete a payment
const deletePayment = async (id) => {
  const response = await axios.delete(`${API_URL + id}`);
  return response.data;
};

// Get a payment
const getPayment = async (id) => {
  const response = await axios.get(`${API_URL + id}`);
  return response.data;
};

// Update payment
const updatePayment = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const paymentService = {
  createPayment,
  getPayments,
  deletePayment,
  getPayment,
  updatePayment,
};

export default paymentService;
