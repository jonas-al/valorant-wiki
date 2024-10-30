import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
