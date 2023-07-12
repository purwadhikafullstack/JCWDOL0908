import { axiosInstance } from "../slice/AdminSlice";

export const getWarehousesInCities = async (id_city) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.get(`/warehouse/city/${id_city}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
