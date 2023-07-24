import { axiosInstance } from "../slice/AdminSlice";

export const updateAdminWarehouse = async (data) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.patch(
      "/",
      { ...data },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
