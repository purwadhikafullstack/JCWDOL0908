import { createSlice } from "@reduxjs/toolkit";
import Storage from "../../../helper/Storage";
import { keepLogin } from "../../auth";

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
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const KeepUser = (token) => {
  return async (dispatch) => {
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
            username,
            role,
            phone_number,
            profile_photo,
          }),
        );
      }
    } catch (error) {
      Storage.removeToken();
      dispatch(resetUser());
    }
  };
};
