const { CheckoutService } = require("../service");
const { CheckoutValidation } = require("../validation");
const checkShippingCoast = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { carts, id_address } = body;

    const { error: errorValidation } = CheckoutValidation.shippingValidation.validate(body);
    if (errorValidation) {
      return res.status(400).json({
        message: errorValidation.message,
        data: null,
      });
    }
    const { error, data } = await CheckoutService.calculateShipping({
      id_user: user.id,
      id_address,
      carts,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Shipping cost calculated successfully",
      data,
    });

  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { body, user } = req;
    const { carts, id_address, id_warehouse, shipping_cost, shipping_service, total_price } = body;
    // const { error: errorValidation } = CheckoutValidation.createOrderValidation.validate(body);

    const { error, data } = await CheckoutService.createOrder({
      id_user: user.id,
      id_address,
      id_warehouse,
      carts,
      shipping_cost,
      shipping_service,
      total_price,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Order created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkShippingCoast,
  createOrder,
};