import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

/**
 * Get shipping cost
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const shippingCost = async (data) => {
  return await AxiosInstances.post('/checkout/shipping-cost', {
    carts: data.carts,
    id_address: data.id_address
  },{
    headers: {
      Authorization: `Bearer ${storage.getToken()}`
    }
  })
};