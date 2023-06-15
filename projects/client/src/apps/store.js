import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../feature/admin/AdminSlice";
import AdminLogInReducer from "../feature/admin/AdminLogInSlice";
import UserReducer from "../feature/auth/slice/UserSlice";
import LoaderReducer from "../feature/LoaderSlice";

export default configureStore({
  reducer: {
    admin: AdminReducer,
    adminLogin: AdminLogInReducer,
    user: UserReducer,
    loader: LoaderReducer,
  },
});
