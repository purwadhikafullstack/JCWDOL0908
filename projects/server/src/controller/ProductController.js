const { ProductService } = require("../service");
const { UploadPhoto, UnlinkPhoto, UploadPhotoEditData } = require("../helper/Multer");
const { ProductsLogic } = require("../logic");
const { AdminDataValidation } = require("../validation");

const listProducts = async (req, res, next) => {
  try {
    const { page, page_size, name, id_category, price_min, price_max, sort_key, sort_condition } = req.query;
    const { error, data } = await ProductService.listProducts({
      page,
      page_size,
      name,
      id_category,
      price_min,
      price_max,
      sort_key,
      sort_condition,
    });
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "list products success",
      data: {
        metadata: data.metadata,
        products: data.products,
      },
    });
  } catch (error) {
    next(error);
  }
};

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

      const { error: err_validation, value } = await AdminDataValidation.CreateNewProduct.validate({ ...data });
      if (err_validation) throw err_validation;

      const { error, result } = await ProductsLogic.postNewProductLogic(data);

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

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, data } = await ProductService.getProduct(id);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    return res.status(200).json({
      message: "get product success",
      data,
    });
  } catch (error) {
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
        const { error: err_validation, value } = await AdminDataValidation.EditProductWithoutImage.validate({
          ...data,
        });
        if (err_validation) throw err_validation;
      } else {
        const { error: err_validation, value } = await AdminDataValidation.CreateNewProduct.validate({
          ...data,
          product_image,
        });
        if (err_validation) throw err_validation;
      }

      const { error, result } = await ProductsLogic.editProductLogic({ ...data, product_image, id_product });

      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success edit product", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

module.exports = {
  listProducts,
  getProduct,
  postNewProduct,
  getProducts,
  deleteProduct,
  editProduct,
};
