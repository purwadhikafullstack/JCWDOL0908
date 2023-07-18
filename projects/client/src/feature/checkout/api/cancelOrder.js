import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const cancelOrder = async (orderId) => {
  return AxiosInstances.put(`/checkout/cancel/${orderId}`, {}, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};