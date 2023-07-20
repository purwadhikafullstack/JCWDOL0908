import { axiosInstance } from "../slice/OrderProductSlice";

export const getOrderProducts = async (dataInput) => {
  try {
    const { offset, limit, page, id_warehouse, status_order } = dataInput;
    const response = await axiosInstance.get(
      `?offset=${offset}&limit=${limit}&page=${page}&id_warehouse=${id_warehouse}&status_order=${status_order}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const rejectPayment = async (id_transaction) => {
  try {
    const response = await axiosInstance.patch(`/${id_transaction}/reject`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const approvePayment = async (id_transaction) => {
  try {
    const response = await axiosInstance.patch(`/${id_transaction}/approve`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const cancelPayment = async (id_transaction) => {
  try {
    const response = await axiosInstance.patch(`/${id_transaction}/cancel`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const createAutoMutation = async (id_transaction) => {
  try {
    const response = await axiosInstance.post(`/${id_transaction}/auto-mutation`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const sendOrder = async (id_transaction) => {
  try {
    const response = await axiosInstance.post(`/${id_transaction}/send-order`);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};
