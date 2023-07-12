import { axiosInstance, setSingleUser } from "../slice/AdminSlice";

export function getSingleUser(id, isAdmin, idRole) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/user/${id}?isAdmin=${isAdmin}&idRole=${idRole}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleUser(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
