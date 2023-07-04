const db = require("../model");
const haversineFormula = require("../helper/HaversineFormula");
const {
  Address,
  Warehouse,
  Cart,
  Product,
  Transaction,
  TransactionProductRlt,
} = db;
const { getShippingCost } = require("../helper/RajaOngkir");
const { updateBookedStock } = require("./ProductService");
const { removeAfterCheckout } = require("./CartService");

/**
 * Calculate shipping cost
 * @param data
 * @return {Promise<{data: (*|null), error: boolean}|{data: null, error}|{data: null, error: Error}>}
 */
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


const createOrder = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { id_address, id_warehouse, carts, id_user, shipping_cost, shipping_service, total_price } = data;

    const transaction = await Transaction.create({
      id_user,
      total_price,
      id_address,
      id_warehouse,
      shipping_cost,
      shipping_service,
    }, { transaction: t });

    const productsInCart = await Cart.findAll({
      where: {
        id_user,
        id_cart: carts.map((cart) => cart),
      },
    });
    if (productsInCart.length === 0) {
      await t.rollback();
      return {
        error: new Error("Failed to create transaction"),
        data: null,
      };
    }
    const transactionDetails = productsInCart.map((product) => {
      return {
        id_transaction: transaction.id_transaction,
        id_product: product?.id_product,
        quantity: product?.quantity,
      };
    });

    const transactionProductRlt = await TransactionProductRlt.bulkCreate(transactionDetails, { transaction: t });

    // if error, rollback
    if (!transactionProductRlt) {
      await t.rollback();
      return {
        error: new Error("Failed to create transaction"),
        data: null,
      };
    }

    // update product booked stock
    await updateBookedStock(transactionDetails, id_warehouse, t);
    // delete cart
    // await CartService.removeAfterCheckout(id_user);
    await t.commit();
    const transactionData = await Transaction.findByPk(transaction.id_transaction);

    return {
      error: false,
      data: transactionData,
    };
  } catch (error) {
    console.log("error D:", error);
    await t.rollback();
    return {
      error,
      data: null,
    };
  }
};

module.exports = {
  calculateShipping,
  createOrder,
};