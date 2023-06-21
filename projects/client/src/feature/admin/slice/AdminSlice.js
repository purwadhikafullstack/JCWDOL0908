import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    singleUser: {},
    allAdmin: [],
    singleAdminWarehouse: {},
  },
  reducers: {
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    setAllAdmin: (state, action) => {
      state.allAdmin = action.payload;
    },
    setSingleAdminWarehouse: (state, action) => {
      state.singleAdminWarehouse = { ...state.singleAdminWarehouse, ...action.payload };
    },
  },
});

export const axiosInstance = axios.create({ baseURL: API_ADMIN });
export default adminSlice.reducer;
export const { setSingleUser, setAllAdmin, setSingleAdminWarehouse } = adminSlice.actions;
