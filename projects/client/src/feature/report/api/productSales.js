import { axiosInstance } from "../slice/productSalesSlice";

export const getTotalSales = async (dataInput) => {
  try {
    const { id_warehouse, startDate, endDate } = dataInput;
    const response = await axiosInstance.get(`?startDate=${startDate}&endDate=${endDate}&id_warehouse=${id_warehouse}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const getTopCategories = async (dataInput) => {
  try {
    const { id_warehouse, startDate, endDate, limit } = dataInput;
    const response = await axiosInstance.get(
      `/category?startDate=${startDate}&endDate=${endDate}&id_warehouse=${id_warehouse}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const getTopProducts = async (dataInput) => {
  try {
    const { id_warehouse, startDate, endDate, limit } = dataInput;
    const response = await axiosInstance.get(
      `/product?startDate=${startDate}&endDate=${endDate}&id_warehouse=${id_warehouse}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};
