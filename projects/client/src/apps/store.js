import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../feature/admin/AdminSlice";

export default configureStore({
  reducer: {
    admin: AdminReducer,
  },
});
