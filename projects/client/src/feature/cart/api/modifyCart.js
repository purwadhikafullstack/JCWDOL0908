import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const modifyCart = (data) => {
  return AxiosInstances.post("/cart", data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};