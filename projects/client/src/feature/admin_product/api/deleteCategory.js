import { axiosInstance } from "../slice/CategorySlice";

export const deleteCategory = async (id_category) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch(
      `/delete/${id_category}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );
    return response.data;
  } catch (error) {
    alert(error.response.data?.message);
  }
};
