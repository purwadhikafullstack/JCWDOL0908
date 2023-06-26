import AxiosInstances from "../../../helper/AxiosInstances";

export const singleProducts = (id) => {
  return AxiosInstances.get(`/products/${id}`)
};