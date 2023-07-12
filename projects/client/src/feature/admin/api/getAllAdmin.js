import { axiosInstance, setAllAdmin } from "../slice/AdminSlice";

export function getAllAdmin(page) {
  return async (dispatch) => {
    const TOKEN = localStorage.getItem("admin_token");
    try {
      const response = await axiosInstance.get(`?limit=8&page=${page}&offset=8`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setAllAdmin(response.data.result));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
