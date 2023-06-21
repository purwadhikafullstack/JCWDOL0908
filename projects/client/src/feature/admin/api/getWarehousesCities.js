import { axiosInstance } from "../slice/AdminSlice";

export const getWarehouseCities = async () => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.get(`/warehouse/cities`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    alert(error.response.data.message);
  }
};
