const { CartService } = require("../service");
const { CartValidation } = require("../validation");

/**
 * AddToCart - Add product to cart also update quantity if product already in cart (increase/decrease quantity)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param next - Express middleware
 */
const AddToCart = async (req, res, next) => {
  try {

    const { error: errorValidation } = await CartValidation.cartValidation.validate(req.body)
    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.message,
        data: null,
      });
    }

    const { productID, quantity } = req.body;
    const userID = req.user.id;
    const payload = {
      userID,
      productID,
      quantity,
    };
    const { error, data } = await CartService.AddToCart(payload);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data,
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * RemoveFromCart - Remove product from cart by productID
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const RemoveFromCart = async (req, res, next) => {
  try {
    const productID = req.params.id_product;
    const userID = req.user.id;
    const payload = {
      userID,
      productID,
    };

    const { error, data } = await CartService.RemoveFromCart(payload);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data,
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const GetCart = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const payload = { userID };
    const { error, data } = await CartService.GetCart(payload);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data,
      });
    }
    return res.status(200).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddToCart,
  RemoveFromCart,
  GetCart,
};
