import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../feature/admin/slice/AdminSlice";
import AdminLogInReducer from "../feature/admin_auth/slice/AdminLogInSlice";
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
