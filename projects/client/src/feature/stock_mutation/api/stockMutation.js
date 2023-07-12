import { axiosInstance } from "../slice/StockMutationSlice";

export const createNewMutationRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/", data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const getMutationRequests = async (offset, limit, page, input) => {
  try {
    const { id_warehouse, mutationType, status } = input;
    const response = await axiosInstance.get(
      `?id_warehouse=${id_warehouse}&mutationType=${mutationType}&offset=${offset}&limit=${limit}&page=${page}&status=${status}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const rejectMutationRequests = async (input) => {
  try {
    const response = await axiosInstance.patch("/reject", input);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const approveMutationRequests = async (input) => {
  try {
    const response = await axiosInstance.patch("/approve", input);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const acceptDeliveredProducts = async (input) => {
  try {
    const response = await axiosInstance.patch("/accept", input);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};
