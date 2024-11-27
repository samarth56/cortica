import axios from "axios";

const API_BASE = "http://localhost:4000/api"; // Replace with your backend URL

export const register = async (data) => {
  return axios.post(`${API_BASE}/auth/register`, data);
};
