import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}/api/product`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/api/product`, product, config);
  return response.data;
};

const updateProduct = async (product, id) => {
  const response = await axios.post(`${base_url}/api/product/${id}`, product, config);
  return response.data;
};
const showProduct = async (id) => {
  const response = await axios.get(`${base_url}/api/product/${id}`, config);
  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}/api/product/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  showProduct,
  deleteProduct,
};

export default productService;
