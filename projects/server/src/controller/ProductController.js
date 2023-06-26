const { UploadPhoto, UnlinkPhoto, UploadPhotoEditData } = require("../helper/Multer");
const { ProductsLogic } = require("../logic");
const { AdminDataValidation } = require("../validation");

const postNewProduct = async (req, res, next) => {
  try {
    const upload = await UploadPhoto("products");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
          data: null,
        });
      }
      const product_image = req.uniqueUrl;
      let data = JSON.parse(req.body.data);
      data = { ...data, product_image };

      var { error, value } = await AdminDataValidation.CreateNewProduct.validate({ ...data });
      if (error) throw error;

      var { error, result } = await ProductsLogic.postNewProductLogic(data);

      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success create product", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  const { offset, limit, page, id_category } = req.query;
  try {
    const { error, result } = await ProductsLogic.getProductsLogic(offset, limit, page, id_category);

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id_product } = req.params;
  try {
    const { error, result } = await ProductsLogic.deleteProductLogic(id_product);

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success delete data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const editProduct = async (req, res, next) => {
  const { id_product } = req.params;
  try {
    const upload = await UploadPhotoEditData("products");
    upload(req, res, async (err) => {
      if (err) return res.status(400).send({ message: err.message, data: null });

      const product_image = req.uniqueUrl;
      let data = JSON.parse(req.body.data);

      if (!product_image) {
        var { error, value } = await AdminDataValidation.editProductWithoutImage.validate({ ...data });
      } else {
        var { error, value } = await AdminDataValidation.CreateNewProduct.validate({ ...data, product_image });
      }
      if (error) throw error;

      var { error, result } = await ProductsLogic.editProductLogic({ ...data, product_image, id_product });

      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success edit product", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

module.exports = { postNewProduct, getProducts, deleteProduct, editProduct };
