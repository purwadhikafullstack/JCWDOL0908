import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const editWarehouse = async (data) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch("/", { ...data }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};
