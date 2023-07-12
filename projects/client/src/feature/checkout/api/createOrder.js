import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const createOrder = async (data) => {
  return await AxiosInstances.post("/checkout/", {
    id_warehouse: data.id_warehouse,
    id_address: data.id_address,
    carts: data.carts,
    shipping_cost: data.shipping_cost,
    shipping_service: data.shipping_service,
    total_price: data.total_price,
  }, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};