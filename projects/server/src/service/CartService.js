const db = require("../model");
const { Cart } = db;
const { getProduct } = require("./ProductService");

/**
 * AddToCart - Add product to cart
 * @param {Object} data
 * @returns {Promise<{data: {}, error: Error}>}
 * */
const AddToCart = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { userID, productID, quantity } = data;
    // Check if product already in cart
    const cart = await Cart.findOne({
      where: {
        id_user: userID,
        id_product: productID,
      },
      transaction: t, // Add transaction to the query
    });

    // If product already in cart, update quantity
    if (cart) {
      const newQuantity = cart.quantity + quantity;

      // make sure quantity is valid for the product
      await validateQuantity(productID, newQuantity);

      // If new quantity <= 0, remove product from cart
      if (newQuantity <= 0) {
        const { error, data } = await RemoveFromCart({ userID, productID });
        return {
          error,
          data: data.message || "Product removed from cart",
        };
      }

      cart.quantity += quantity;
      await cart.save({ transaction: t }); // Add transaction to the save operation
      await t.commit(); // Commit the transaction
      return {
        error: false,
        data: cart,
      };
    }

    // if quantity <= 0, return error
    if (quantity <= 0) {
      return {
        error: new Error("Invalid quantity"),
        data: {},
      };
    }

    // make sure quantity is valid for the product
    await validateQuantity(productID, quantity);

    // If product not in cart, create new cart
    const newCart = await Cart.create({
      id_user: userID,
      id_product: productID,
      quantity,
      transaction: t, // Add transaction to the create operation
    });

    await t.commit(); // Commit the transaction
    return {
      error: false,
      data: newCart,
    };
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of an error
    return {
      error: error,
      data: [],
    };
  }
};

/**
 * validateQuantity - Validate quantity of product in cart
 * @param productID
 * @param quantity
 * @returns {Promise<void>}
 */
const validateQuantity = async (productID, quantity) => {
  const response = await getProduct(productID);
  const stock = response.data.dataValues.stock;

  if (quantity > stock) {
    throw new Error("Insufficient stock");
  }
};
;

/**
 * RemoveFromCart - Remove product from cart by productID
 * @param {Object} data
 * @returns {Promise<{data: {}, error}>}
 */
const RemoveFromCart = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { userID, productID } = data;

    const cart = await Cart.findOne({
      where: {
        id_user: userID,
        id_product: productID,
      },
      transaction: t,
    });

    if (!cart) {
      return {
        error: new Error("Product not found in cart"),
        data: {},
      };
    }

    await cart.destroy({ transaction: t });
    await t.commit();
    return {
      error: false,
      data: {
        message: "Product removed from cart",
      },
    };
  } catch (error) {
    await t.rollback();
    return {
      error,
      data: {},
    };
  }
};

/**
 * @param data
 * @returns {Promise<{data: [], error}>}
 */
const GetCart = async (data) => {
  try {
    const { userID } = data;
    const cart = await Cart.findAll({
      where: {
        id_user: userID,
      },
      include: [
        {
          model: db.Product,
          as: "product",
          attributes: ["product_name", "price", "product_image"],
        },
      ],
    });
    return {
      error: false,
      data: cart,
    };
  } catch (error) {
    return {
      error,
      data: [],
    };
  }
};

module.exports = {
  AddToCart,
  RemoveFromCart,
  GetCart,
};
