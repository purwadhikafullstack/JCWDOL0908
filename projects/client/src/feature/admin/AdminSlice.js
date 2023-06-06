import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;
const TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUser: [],
    singleUser: [],
  },
  reducers: {
    setAllUserData: (state, action) => {
      state.allUser = action.payload;
    },
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },
  },
});

export default adminSlice.reducer;

export const { setAllUserData, setSingleUser } = adminSlice.actions;

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
