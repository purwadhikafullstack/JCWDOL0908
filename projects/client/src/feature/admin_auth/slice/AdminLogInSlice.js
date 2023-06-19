import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN = localStorage.getItem("admin_token");

export const API_ADMIN_LOGIN = process.env.REACT_APP_ADMIN_LOGIN_URL;

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

export default adminLogInSlice.reducer;
export const { setLoggedInAdminData, setLoggedInAdminDataBack } = adminLogInSlice.actions;
export const axiosInstance = axios.create({ baseURL: API_ADMIN_LOGIN, headers: { Authorization: `Bearer ${TOKEN}` } });
