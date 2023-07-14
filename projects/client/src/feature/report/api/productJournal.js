import { axiosInstance } from "../slice/ProductJournalSlice";

export const getProductJournal = async (dataInput) => {
  try {
    const response = await axiosInstance.get(`?filter=${dataInput}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const getProductJournalDetail = async (dataInput) => {
  try {
    const { currentMonth, id_warehouse, id_product } = dataInput;
    const response = await axiosInstance.get(`/${id_product}/product/${id_warehouse}/warehouse?filter=${currentMonth}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};
