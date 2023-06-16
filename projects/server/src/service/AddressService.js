const db = require("../model");
const { Province, City, Address, User } = db;
const { Op } = require("sequelize");

/**
 * GetProvinces - Get all provinces
 * @returns {Promise<{error: *, data: *}>}
 * @constructor
 */
const GetProvinces = async () => {
  try {
    const provinces = await Province.findAll(
      {
        order: [["province", "ASC"]],
      },
    );
    return {
      error: null,
      data: provinces,
    };
  } catch (e) {
    return {
      error: e,
      data: null,
    };
  }
};

/**
 * GetCity - Get all cities by provinceID
 * @param provinceID
 * @returns {Promise<{data: null, error}|{data: City[], error: null}>}
 * @constructor
 */
const GetCity = async (provinceID) => {
  try {
    const cities = await City.findAll(
      {
        where: {
          id_province: provinceID,
        },
        order: [["city", "ASC"]],
      },
    );
    return {
      error: null,
      data: cities,
    };
  } catch (e) {
    return {
      error: e.message,
      data: null,
    };
  }
};


module.exports = {
  GetProvinces,
  GetCity,
};