import { axiosInstance } from "../slice/AdminSlice";

export const createNewAdmin = async (data) => {
  try {
    const TOKEN = localStorage.getItem("admin_token");
    const response = await axiosInstance.post(
      "/",
      { ...data },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};
