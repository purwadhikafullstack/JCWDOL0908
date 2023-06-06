import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ADMIN = process.env.REACT_APP_ADMIN_URL;
const TOKEN = process.env.REACT_APP_ADMIN_TOKEN;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUser: [],
  },
  reducers: {
    setAllUserData: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export default adminSlice.reducer;

export const { setAllUserData } = adminSlice.actions;

export function getAllUserData(page) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${API_ADMIN}/all-user?limit=8&page=${page}&offset=8`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = response.data.result;
      dispatch(setAllUserData(data));
    } catch (error) {
      console.log(error);
    }
  };
}
