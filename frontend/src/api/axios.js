import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // adjust based on your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
