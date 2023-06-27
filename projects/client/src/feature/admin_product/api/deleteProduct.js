import { axiosInstance } from "../slice/ProductSlice";

export const deleteProduct = async (id_product) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    const response = await axiosInstance.patch(
      `/delete/${id_product}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};
