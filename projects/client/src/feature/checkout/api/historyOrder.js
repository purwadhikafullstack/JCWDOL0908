import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const historyOrder = async (page) => {
  return AxiosInstances.get(`/checkout/history?page=${page}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};