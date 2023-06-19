import { createSlice } from "@reduxjs/toolkit";
import Storage from "../../../helper/Storage";
import { keepLogin } from "../../auth";
import storage from "../../../helper/Storage";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      email: "",
      username: "",
      role: "",
      phone_number: "",
      profile_photo: "",
    },
    isChecked: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        email: "",
        username: "",
        role: "",
        phone_number: "",
        profile_photo: "",
      };
    },
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
    },
  },
});

export const { setUser, resetUser, setIsChecked } = userSlice.actions;

export default userSlice.reducer;

export const KeepUser = (token) => {
  return async (dispatch) => {
    if(!token) {
      dispatch(resetUser());
      dispatch(setIsChecked(true));
      return;
    }
    try {
      const response = await keepLogin();

      if (response.data.message === "Unauthorized") {
        Storage.removeToken();
        dispatch(resetUser());
      } else {
        const { id_user, email, username, role, phone_number, profile_photo } = response.data.data;
        dispatch(
          setUser({
            id: id_user,
            email,
            username: username ? username : "",
            role,
            phone_number: phone_number ? phone_number : "",
            profile_photo : profile_photo ? profile_photo : "",
          }),
        );
      }
    } catch (error) {
      Storage.removeToken();
      dispatch(resetUser());
    } finally {

      dispatch(setIsChecked(true));
    }
  };
};
