import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;
const TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUser: [],
    singleUser: {},
    allAdmin: [],
    singleAdminWarehouse: {},
  },
  reducers: {
    setAllUserData: (state, action) => {
      state.allUser = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
    setAllAdmin: (state, action) => {
      state.allAdmin = action.payload;
    },
    setSingleAdminWarehouse: (state, action) => {
      state.singleAdminWarehouse = action.payload;
    },
  },
});

export default adminSlice.reducer;

export const {
  setAllUserData,
  setSingleUser,
  setAllAdmin,
  setSingleAdminWarehouse,
  setWarehouseCities,
  setWarehouses,
} = adminSlice.actions;

export function getAllUserData(page) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_ADMIN}/all-user?limit=8&page=${page}&offset=8`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = response.data.result;
      dispatch(setAllUserData(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleUser(id, isAdmin, idRole) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_ADMIN}/single-user?id=${id}&isAdmin=${isAdmin}&idRole=${idRole}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleUser(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllAdmin(page) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_ADMIN}?limit=7&page=${page}&offset=7`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setAllAdmin(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSingleWarehouseAdmin(id) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_ADMIN}/single-admin-warehouse?id=${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      dispatch(setSingleAdminWarehouse(response.data.result));
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };
}

export const getWarehouseCities = async () => {
  try {
    let response = await axios.get(`${API_ADMIN}/warehouse/all-city`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const getWarehouses = async (id_city) => {
  try {
    let response = await axios.get(`${API_ADMIN}/warehouse/id-city?id_city=${id_city}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const updateAdminWarehouse = async (data) => {
  try {
  } catch (error) {}
};
