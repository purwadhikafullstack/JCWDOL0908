import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN = localStorage.getItem("admin_token");

export const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
export const axiosInstance = axios.create({
  baseURL: `${REACT_APP_API_BASE_URL}/admin-login`,
  headers: { Authorization: `Bearer ${TOKEN}` },
});
