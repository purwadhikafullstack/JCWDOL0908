import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const deleteWarehouse = async (id_warehouse) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const result = await axiosInstance.patch(
      `/delete/${id_warehouse}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};
