import { axiosInstance } from "../slice/CategorySlice";

export const postCategory = async (formData) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.post("/", formData, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response.data;
  } catch (error) {
    alert(error.response.data?.message);
  }
};
