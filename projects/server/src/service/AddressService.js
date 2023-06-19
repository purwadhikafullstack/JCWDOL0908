const db = require("../model");
const { Province, City, Address, User } = db;
const { Op } = require("sequelize");
const { GetPositionMapbox } = require("../helper/Mapbox");

/**
 * GetProvinces - Get all provinces
 * @returns {Promise<{error: *, data: *}>}
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

/**
 * GetCityByID - Get all cities by cityIDs
 * @param cityID
 * @returns {Promise<City | null>}
 */
const GetCityByID = async (cityID) => {
  try {
    return await City.findByPk(cityID);
  } catch (e) {
    return null;
  }
};

/**
 * GetAddressByID - Get address by addressID
 * @param addressID
 * @returns {Promise<Address|null|null>}
 */
const GetAddressByID = async (addressID) => {
  try {
    return await Address.findByPk(addressID);
  } catch (e) {
    return null;
  }
};

/**
 * SaveUserAddress - Save user address
 * @param data
 * @returns {Promise<{error: *, data: *}>}
 */
const StoreUserAddress = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id_user, address, id_city, notes, longitude, latitude } = data;

    // check city
    const city = await GetCityByID(id_city);
    if (!city) {
      return {
        error: new Error("City not found"),
        data: null,
      };
    }

    // Check if the user already has an address
    const userAddress = await Address.findOne({
      where: {
        id_user: id_user,
      },
    });

    const payload = {};
    payload.is_primary = userAddress ? 0 : 1;

    // check if latitude and longitude is not empty
    if (latitude !== undefined && longitude !== undefined) {
      payload.latitude = latitude;
      payload.longitude = longitude;
    } else {
      // get latitude and longitude from city using mapbox
      const { error, response } = await GetPositionMapbox(address, city?.city, city?.type_city);
      if (error) {
        return {
          error,
          data: null,
        };
      }
      payload.latitude = response.latitude;
      payload.longitude = response.longitude;
    }

    // Save the address
    const newAddress = await Address.create(
      {
        address,
        id_user,
        id_city,
        notes,
        ...payload,
      },
      { transaction: t },
    );
    await t.commit();
    return {
      error: null,
      data: newAddress,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * MakeAddressPrimary - a function to update address to be primary
 * @param data
 * @returns {Promise<{error: *, data: *}>}
 */
const MakeAddressPrimary = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id_user, id_address } = data;

    // check if address is exist
    const address = await GetAddressByID(id_address);

    if (!address) {
      return {
        error: new Error("Address not found"),
        data: null,
      };
    }

    // make all address is_primary = 0
    await Address.update({ is_primary: 0 }, {
      where: {
        id_user,
      },
      transaction: t,
    });

    // make address is_primary = 1
    await Address.update({ is_primary: 1 }, { where: { id_address }, transaction: t });
    await t.commit();

    address.is_primary = 1;

    return {
      error: null,
      data: address,
    };

  } catch (error) {
    await t.rollback();
    return {
      error,
      data: null,
    };
  }
};

/**
 * GetAddressByUserID - Get all address by userID
 * @param data
 * @returns {Promise<{error: *, data: Address[]}>}
 */
const GetAddressByUserID = async (data) => {
  try {
    const { id_user, page, limit } = data;

    const { count, rows: addresses } = await Address.findAndCountAll({
      where: {
        id_user,
        is_deleted: 0,
      },
      order: [["is_primary", "DESC"]],
      include: [
        {
          model: City,
          as: "city",
          attributes: ["city", "type_city"],
          include: [{ model: Province, as: "province", attributes: ["province"] }],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    const metadata = {
      total: count,
      page,
      page_size: limit,
      total_page: Math.ceil(count / limit),
    };

    return {
      error: null,
      data: {
        metadata,
        addresses,
      },
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * UpdateUserAddress - Update user address
 * @param data
 * @returns {Promise<{error: *, data: *}>}
 */
const UpdateUserAddress = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id_address, address, id_city, notes, longitude, latitude, id_user } = data;

    // Check city
    const city = await GetCityByID(id_city);
    if (!city) {
      return {
        error: new Error("City not found"),
        data: null,
      };
    }

    const payload = {};

    // check if latitude and longitude is not empty
    if (latitude !== undefined && longitude !== undefined) {
      payload.latitude = latitude;
      payload.longitude = longitude;
    } else {
      // get latitude and longitude from city using mapbox
      const { error, response } = await GetPositionMapbox(address, city?.city, city?.type_city);
      if (error) {
        return {
          error,
          data: null,
        };
      }
      payload.latitude = response.latitude;
      payload.longitude = response.longitude;
    }

    // Update the address
    await Address.update(
      { address, id_city, notes, ...payload },
      { where: { id_address, id_user } },
      { transaction: t },
    );
    await t.commit();
    const existingAddress = await GetAddressByID(id_address);
    return {
      error: null,
      data: existingAddress,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};


module.exports = {
  GetProvinces,
  GetCity,
  StoreUserAddress,
  MakeAddressPrimary,
  GetAddressByID,
  GetAddressByUserID,
  UpdateUserAddress,
};