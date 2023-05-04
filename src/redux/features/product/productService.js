import axios from "axios"

export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

const API_URL = `${BACKEND_URL}/api/products`

// Create New Product
const createProduct = async (formData) => {
    const response = await axios.post(`${API_URL}`, formData)
    return response.data
}

const productService = {
    createProduct
}

export default productService