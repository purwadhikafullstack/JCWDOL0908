import { axiosInstance, setSingleAdminWarehouse } from "../slice/AdminSlice";

export function getSingleWarehouseAdmin(id) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/admin-warehouse/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleAdminWarehouse(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
