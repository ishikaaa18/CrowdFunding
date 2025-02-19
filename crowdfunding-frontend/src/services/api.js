import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};
