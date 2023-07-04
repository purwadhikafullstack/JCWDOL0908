const db = require("../model");
const haversineFormula = require("../helper/HaversineFormula");
const { Address, Warehouse, Cart, Product } = db;
const { getShippingCost } = require("../helper/RajaOngkir");

const calculateShipping = async (data) => {
  try {
    const { id_address, carts, id_user } = data;

    const userAddress = await Address.findByPk(id_address);

    const warehouses = await Warehouse.findAll({
      where: {
        is_deleted: false,
      },
    });

    // calculate distance
    const warehousesWithDistance = warehouses.map((warehouse) => {
      const distance = haversineFormula(userAddress, warehouse);
      return {
        ...warehouse.toJSON(),
        distance,
      };
    });

    // sort warehouse by distance
    warehousesWithDistance.sort((a, b) => a.distance - b.distance);

    // get products in the cart
    const productsInCart = await Cart.findAll({
      where: {
        id_user,
        id_cart: carts.map((cart) => cart),
      },
      include: {
        model: Product,
        attributes: ["id_product", "product_name", "price", "weight_kg"],
      },
    });

    // calculate total weight
    const totalWeight = productsInCart.reduce((acc, product) => {
      return acc + product?.product.weight_kg * product?.quantity;
    }, 0);

    // get shipping cost from rajaongkir
    const results = await getShippingCost({
      origin: warehousesWithDistance[0].id_city,
      destination: userAddress.id_city,
      weight: totalWeight,
    });

    if (results.error) {
      return {
        error: new Error(results.message),
        data: null,
      };
    }

    return {
      error: false,
      data: results.data,
    };


  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

module.exports = {
  calculateShipping,
};