import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};
