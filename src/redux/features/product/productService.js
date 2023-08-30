import axios from "axios";

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL + id}`);
  return response.data;
};

// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL + id}`);
  return response.data;
};

// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const addToCart = async (id) => {
  const response = await axios.post(`${API_URL}add-cart/${id}`);
  return response.data;
};
const getCartItems = async () => {
  const response = await axios.get(`${API_URL}cart`);
  return response.data;
};
const clearCart = async () => {
  const response = await axios.post(`${API_URL}clear-cart`);
  return response.data;
};
const removeCartItem = async (id) => {
  const response = await axios.post(`${API_URL}remove-item/${id}`);
  return response.data;
};

const removeUnityItem = async (id) => {
  const response = await axios.post(`${API_URL}remove-itemqt/${id}`);
  return response.data;
};

const checkout = async (formData) => {
  const response = await axios.post(`${API_URL}checkout`, formData);
  return response.data;
};

const duplicateProduct = async (id) => {
  const response = await axios.post(`${API_URL}duplicate/${id}`);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  addToCart,
  getCartItems,
  clearCart,
  removeCartItem,
  removeUnityItem,
  checkout,
  duplicateProduct,
};

export default productService;
