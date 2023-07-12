import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const getWarehouses = async (page) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.get(`?limit=9&page=${page}&offset=9`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const result = response.data.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
