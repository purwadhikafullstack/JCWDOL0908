import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const removeCart = async (id_product) => {
  return AxiosInstances.delete(`/cart/${id_product}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};