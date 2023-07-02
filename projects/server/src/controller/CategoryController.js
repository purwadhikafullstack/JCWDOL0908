const { UploadPhoto, UnlinkPhoto, UploadPhotoEditData } = require("../helper/Multer");
const { AdminDataValidation } = require("../validation");
const { CategoryLogic } = require("../logic");

const createNewCategory = async (req, res, next) => {
  try {
    const upload = await UploadPhoto("categories");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          message: err.message,
          data: null,
        });
      }
      const category_image = req.uniqueUrl;
      const { category_name } = JSON.parse(req.body.data);

      //validate input data
      const { error: err_validation, value } = AdminDataValidation.CreateNewCategory.validate({
        category_name,
        category_image,
      });
      if (err_validation) throw error;

      const { error, result } = await CategoryLogic.createNewCategoryLogic(category_image, category_name);

      // check whether error exists
      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success create category", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

const editCategory = async (req, res, next) => {
  const { id_category } = req.params;
  try {
    const upload = await UploadPhotoEditData("categories");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: err.message, data: null });
      }
      const category_image = req?.uniqueUrl;
      const { category_name } = JSON.parse(req.body.data);
      console.log(category_image, category_name);
      //validate input data
      if (!category_image) {
        const { error: err_validation, value } = AdminDataValidation.editCategoryWithoutImage.validate({
          category_name,
        });
        if (err_validation) throw error;
      } else {
        const { error: err_validation, value } = AdminDataValidation.CreateNewCategory.validate({
          category_name,
          category_image,
        });
        if (err_validation) throw error;
      }

      const { error, result } = await CategoryLogic.editCategoryLogic(category_image, category_name, id_category);

      // check whether error exists
      if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
      if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

      return res.status(202).send({ isSuccess: true, message: "success edit category", result });
    });
  } catch (error) {
    await UnlinkPhoto(req.uniqueUrl);
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const { offset, limit, page } = req.query;
    const { error, result } = await CategoryLogic.getCategoriesLogic(offset, limit, page);

    // check whether error exists
    if (error) return res.status(500).send({ isSuccess: false, message: "internal server error", error });

    return res.status(200).send({ isSuccess: true, message: "success fetched data", result });
  } catch (error) {
    // unknown error
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id_category } = req.params;
  console.log(id_category);
  try {
    const { error, result } = await CategoryLogic.deleteCategoryLogic(id_category);

    // check whether error exists
    if (error?.errMsg) return res.status(error.statusCode).send({ message: error.errMsg, isSuccess: false });
    if (error) return res.status(500).send({ message: "internal server error", isSuccess: false, error });

    return res.status(202).send({ message: "data deleted", isSuccess: true });
  } catch (error) {
    // unknown error
    next(error);
  }
};

module.exports = { createNewCategory, editCategory, getCategories, deleteCategory };
