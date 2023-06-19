import axios from "axios";
import { API_ADMIN_LOGIN, setLoggedInAdminData } from "../slice/AdminLogInSlice";

export function loggingInAdmin(username, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_ADMIN_LOGIN}`, { username, password });
      await dispatch(setLoggedInAdminData({ ...response.data.result, isLoggedIn: true }));
      localStorage.setItem("admin_token", response.data.token);
      return response.data.isSuccess;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
