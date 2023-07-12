import { axiosInstance, setLoggedInAdminData } from "../slice/AdminLogInSlice";

export function keepAdminLoggedIn() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/keep-logged");
      await dispatch(setLoggedInAdminData({ ...response.data.result, isLoggedIn: true }));
      localStorage.setItem("admin_token", response.data.token);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
