import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;
const TOKEN = localStorage.getItem("user_token");

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

const axiosInstance = axios.create({ baseURL: API_ADMIN, headers: { Authorization: `Bearer ${TOKEN}` } });
export default adminSlice.reducer;
export const { setSingleUser, setAllAdmin, setSingleAdminWarehouse } = adminSlice.actions;

export function getAllUserData(page) {
  return async (dispatch) => {
    try {
      let response = await axiosInstance.get(`/users?limit=8&page=${page}&offset=8`);
      const data = response.data.result;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleUser(id, isAdmin, idRole) {
  return async (dispatch) => {
    try {
      let response = await axiosInstance.get(`/user/${id}?isAdmin=${isAdmin}&idRole=${idRole}`);
      dispatch(setSingleUser(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllAdmin(page) {
  return async (dispatch) => {
    try {
      let response = await axiosInstance.get(`?limit=7&page=${page}&offset=7`);
      dispatch(setAllAdmin(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleWarehouseAdmin(id) {
  return async (dispatch) => {
    try {
      let response = await axiosInstance.get(`/admin-warehouse/${id}`);
      dispatch(setSingleAdminWarehouse(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export const getWarehouseCities = async () => {
  try {
    let response = await axiosInstance.get(`/warehouse/cities`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getWarehouses = async (id_city) => {
  try {
    let response = await axiosInstance.get(`/warehouse/city/${id_city}`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const updateAdminWarehouse = async (data) => {
  try {
    let response = await axiosInstance.patch("/", { ...data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
