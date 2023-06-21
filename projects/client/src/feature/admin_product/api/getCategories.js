import { axiosInstance } from "../slice/CategorySlice";

export const getCategories = async (page) => {
  try {
    const response = await axiosInstance(`?limit=4&page=${page}&offset=4`);
    const result = response.data.result;
    return result;
  } catch (error) {
    console.log(error);
  }
};
