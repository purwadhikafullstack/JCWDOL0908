import { axiosInstance } from "../slice/AdminSlice";

export const deleteUserData = async (id_user) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.patch(
      `/user/${id_user}`,
      {},
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
