const axios = require("axios");

/**
 * GetPositionMapbox - get latitude and longitude from mapbox API by city name and type
 * @param address - address ex : "Jalan Raya or RT 01 RW 02"
 * @param cityName - city name
 * @param typeCity - type city ex : "Kota" or "Kabupaten"
 * @returns {Promise<{response: {message: string}, error: boolean}|{response: {latitude: *, longitude: *}, error: boolean}>}
 */
const GetPositionMapbox = async (address = "",cityName, typeCity) => {
  try {
    const query = `${address} ${typeCity} ${cityName}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAP_BOX_KEY}`;
    console.log(url);
    const response_mapbox = await axios.get(url);

    const response_error = {
      error: true,
      response: { message: "Error getting position" },
    };

    if (response_mapbox.status !== 200) {
      return response_error;
    }

    const { features } = response_mapbox.data;

    if (features.length === 0) {
      return response_error;
    }

    const { center } = features[0];
    const [longitude, latitude] = center;

    return {
      error: false,
      response: {
        longitude,
        latitude,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      error: true,
      response: { message: "Error getting position" },
    };
  }
};

module.exports = { GetPositionMapbox };
