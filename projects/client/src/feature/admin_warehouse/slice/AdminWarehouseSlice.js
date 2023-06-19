import axios from "axios";
const API_ADMIN_WAREHOUSE = process.env.REACT_APP_ADMIN_WAREHOUSE_URL;
export const axiosInstance = axios.create({ baseURL: API_ADMIN_WAREHOUSE });
