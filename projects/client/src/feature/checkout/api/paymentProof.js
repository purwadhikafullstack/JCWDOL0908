import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const paymentProof = async (data, id_transaction) => {
  return AxiosInstances.put(`checkout/payment/${id_transaction}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${storage.getToken("token")}`,
    },
  });
};