import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const createNewWarehouse = async (data) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.post("new", { ...data }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};
