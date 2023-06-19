import { axiosInstance } from "../slice/AdminWarehouseSlice";

export const getProvinces = async () => {
  try {
    const response = await axiosInstance.get("/provinces");
    return response.data.result;
  } catch (error) {
    alert(error.response.data.result.message);
  }
};
