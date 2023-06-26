import { axiosInstance } from "../slice/ProductSlice";

export const getProducts = async (offset, limit, page, id_category) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    let response;
    if (id_category) {
      response = await axiosInstance.get(`?offset=${offset}&limit=${limit}&page=${page}&id_category=${id_category}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
    } else {
      response = await axiosInstance.get(`?offset=${offset}&limit=${limit}&page=${page}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
    }
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
};
