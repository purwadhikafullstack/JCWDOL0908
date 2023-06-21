import { axiosInstance } from "../slice/AdminSlice";

export function getAllUserData(page) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`/users?limit=8&page=${page}&offset=8`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = response.data.result;
      return data;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
