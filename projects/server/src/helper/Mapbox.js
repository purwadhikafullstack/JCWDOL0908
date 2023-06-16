const axios = require("axios");

/**
 * GetPositionMapbox - get latitude and longitude from mapbox API by city name and type city ex : "Kota Bandung"
 * @param cityName
 * @param typeCity
 * @returns {Promise<{response: {message: string}, error: boolean}|{response: {latitude: *, longitude: *}, error: boolean}>}
 */
const GetPositionMapbox = async (cityName, typeCity) => {
  try {
    const query = `${typeCity} ${cityName}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MapBoxKey}`;
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
