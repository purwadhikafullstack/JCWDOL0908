import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const getCart = () => {
  return AxiosInstances.get('/cart',{
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    }
  });
};