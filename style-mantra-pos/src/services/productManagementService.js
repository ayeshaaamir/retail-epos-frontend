import axios from "axios";
import { API_BASE_URL } from "../constants";

const PRODUCT_API = `${API_BASE_URL}/product`;

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};
