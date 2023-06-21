import { axiosInstance } from "../slice/CategorySlice";

export const editCategory = async (formData, id_category) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch(`/edit/${id_category}`, formData, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data?.message);
  }
};
