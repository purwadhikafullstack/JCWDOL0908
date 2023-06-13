import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN_LOGIN = process.env.REACT_APP_ADMIN_LOGIN_URL;
const TOKEN = localStorage.getItem("admin_token");

export const adminLogInSlice = createSlice({
  name: "adminLogin",
  initialState: {
    loggedInAdminData: { isLoggedIn: false },
  },
  reducers: {
    setLoggedInAdminData: (state, action) => {
      state.loggedInAdminData = { ...action.payload };
    },
    setLoggedInAdminDataBack: (state, action) => {
      state.loggedInAdminData = { isLoggedIn: false };
    },
  },
});

const axiosInstance = axios.create({ baseURL: API_ADMIN_LOGIN, headers: { Authorization: `Bearer ${TOKEN}` } });
export default adminLogInSlice.reducer;
export const { setLoggedInAdminData, setLoggedInAdminDataBack } = adminLogInSlice.actions;

export function loggingInAdmin(username, password) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_ADMIN_LOGIN}`, { username, password });
      await dispatch(setLoggedInAdminData({ ...response.data.result, isLoggedIn: true }));
      await localStorage.setItem("admin_token", response.data.token);
      return response.data.isSuccess;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function keepAdminLoggedIn() {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post("/keep-logged");
      await dispatch(setLoggedInAdminData({ ...response.data.result, isLoggedIn: true }));
      await localStorage.setItem("admin_token", response.data.token);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
