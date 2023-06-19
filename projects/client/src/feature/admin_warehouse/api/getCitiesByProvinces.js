import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const getCitiesByProvinces = async (id_province) => {
  try {
    const response = await axiosInstance.get(`/provinces/cities?id_province=${id_province}`);
    return response.data.result;
  } catch (error) {
    alert(error.response.data.result.message);
  }
};
