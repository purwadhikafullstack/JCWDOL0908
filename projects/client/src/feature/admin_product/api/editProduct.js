import { axiosInstance } from "../slice/ProductSlice";

export const editProduct = async (formData, id_product) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch(`/edit/${id_product}`, formData, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data?.message);
  }
};
