import axios from "axios";
import { API_BASE_URL } from "../constants";

const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

const authService = { login };
export default authService;
