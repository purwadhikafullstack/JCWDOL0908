import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../feature/admin/AdminSlice";
import AdminLogInReducer from "../feature/admin/AdminLogInSlice";

export default configureStore({
  reducer: {
    admin: AdminReducer,
    adminLogin: AdminLogInReducer,
  },
});
