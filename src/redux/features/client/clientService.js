import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/clients/`;

const createClient = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data;
};

const getClients = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getClient = async (id) => {
  const response = await axios.get(`${API_URL + id}`);
  return response.data;
};

const updateClient = async (id, formData) => {
  const response = await axios.patch(`${API_URL + id}`, formData);
  return response.data;
};

const deleteClient = async (id) => {
  const response = await axios.delete(`${API_URL + id}`);
  return response.data;
};

const paymentService = {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};

export default paymentService;
