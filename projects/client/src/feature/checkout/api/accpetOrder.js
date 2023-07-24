import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const acceptOrder = async (orderId) => {
  return AxiosInstances.put(`/checkout/accept/${orderId}`, {}, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};