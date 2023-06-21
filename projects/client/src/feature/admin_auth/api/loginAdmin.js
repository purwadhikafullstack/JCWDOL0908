import axios from "axios";
import { REACT_APP_API_BASE_URL, setLoggedInAdminData } from "../slice/AdminLogInSlice";

export function loggingInAdmin(username, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_BASE_URL}/admin-login`, { username, password });
      await dispatch(setLoggedInAdminData({ ...response.data.result, isLoggedIn: true }));
      localStorage.setItem("admin_token", response.data.token);
      return response.data.isSuccess;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
