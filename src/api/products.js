// src/api/products.js
import axios from "axios";

const BASE = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const res = await axios.get(`${BASE}/products`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE}/products/${id}`);
  return res.data;
};
