const db = require("../model");
const { CategoryService } = require("../service");
const { UnlinkPhoto } = require("../helper/Multer");

const deleteCategoryLogic = async (id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const response = await CategoryService.deleteCategory(id_category, transaction);
    if (response[0] !== 1) throw { errMsg: "error: not found", statusCode: 404 };
    await transaction.commit();
    return { error: null, result: response };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const getCategoriesLogic = async (offset, limit, page) => {
  try {
    let categoriesCount;
    let totalPage;

    if (offset && limit && page) {
      categoriesCount = await CategoryService.getCategoriesCount();
      categoriesCount = categoriesCount[0].dataValues.category_count;
      totalPage = Math.ceil(categoriesCount / limit);
    }

    let categories = await CategoryService.getCategories(offset, limit, page);
    categories = categories.map((category) => {
      return category.dataValues;
    });

    const result = { categories, totalPage };
    return { error: null, result };
  } catch (error) {
    console.log(error);
    return { error, result: null };
  }
};

const editCategoryLogic = async (category_image, category_name, id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isNameExist = await CategoryService.getCategoryByNameExceptSelf(category_name, id_category, transaction);
    if (isNameExist) throw { errMsg: "error: name already exists", statusCode: 400 };
    // get current image pattern data
    const getSingleData = await CategoryService.getCategoryById(id_category, transaction);
    const oldImage = getSingleData.dataValues.category_image;

    // update data
    const update = await CategoryService.updateData(id_category, category_image, category_name, transaction);

    // delete previous image pattern data
    if (category_image) await UnlinkPhoto(oldImage);

    await transaction.commit();
    return { error: null, result: update };
  } catch (error) {
    await UnlinkPhoto(category_image);
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

const createNewCategoryLogic = async (category_image, category_name, id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isNameExist = await CategoryService.getCategory(category_name, transaction);

    if (isNameExist) throw { errMsg: "error: name already exists", statusCode: 400 };

    const result = await CategoryService.createCategory(category_image, category_name, transaction);

    await transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(category_image);
    await transaction.rollback();
    console.log(error);
    return { error, result: null };
  }
};

module.exports = {
  deleteCategoryLogic,
  getCategoriesLogic,
  editCategoryLogic,
  createNewCategoryLogic,
};
