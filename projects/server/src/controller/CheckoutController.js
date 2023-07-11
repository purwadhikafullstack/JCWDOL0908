const { CheckoutService } = require("../service");
const { CheckoutValidation } = require("../validation");
const { UploadPhoto } = require("../helper/Multer");
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

const payOrder = async (req, res, next) => {
  try {
    const upload = await UploadPhoto("transactions");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
          data: null,
        });
      }
      const transaction_image = req.uniqueUrl;
      const { id } = req.params;

      const { error, data } = await CheckoutService.storePaymentProof({
        id_transaction: id,
        payment_proof: transaction_image,
      });

      if (error) {
        return res.status(400).json({
          message: error.message,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Payment proof stored successfully",
        data,
      });
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { user } = req;
    const { limit = 6, page = 1 } = req.query;

    const { error, data } = await CheckoutService.getTransactions({
      id_user: user.id,
      limit,
      page,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Orders retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const acceptTransaction = async (req, res, next) => {
  try {
    const {  user } = req;
    const { id } = req.params;

    const { error, data } = await CheckoutService.acceptTransaction({
      id_transaction: id,
      id_user: user.id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Transaction accepted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

const cancelTransaction = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const { error, data } = await CheckoutService.cancelTransaction({
      id_transaction: id,
      id_user: user.id,
    });

    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Transaction canceled successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkShippingCoast,
  createOrder,
  payOrder,
  getOrders,
  acceptTransaction,
  cancelTransaction,
};