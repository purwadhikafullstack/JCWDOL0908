import { axiosInstance } from "../slice/ProductSlice";

export const postProduct = async (formData) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.post("/", formData, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};
