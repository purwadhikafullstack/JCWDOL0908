const axios = require("axios");

/**
 * Get shipping cost from RajaOngkir API
 * @param origin
 * @param destination
 * @param weight
 * @param courier
 * @return {Promise<{data: any, error: boolean}|{data: null, error}>}
 */
const getShippingCost = async ({ origin, destination, weight, courier = "jne:post" }) => {
  try {
    const apiUrl = 'https://pro.rajaongkir.com/api/cost';
    const requestData = {
      origin: 24,
      originType: 'city',
      destination: 163,
      destinationType: 'city',
      weight: 12 * 1000,
      courier: 'jne:pos'
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'key': process.env.RAJAONGKIR_KEY
      }
    })

    return {
      error: false,
      data: response.data.rajaongkir.results
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

module.exports = {
  getShippingCost,
};