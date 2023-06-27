const db = require("../model");
const { Category, sequelize } = db;
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { UnlinkPhoto } = require("../helper/Multer");

const getCategory = async (category_name, transaction) => {
  const category = await Category.findOne({ where: { category_name }, transaction });
  return category;
};

const getCategoryByNameExceptSelf = async (category_name, id_category, transaction) => {
  const category = await Category.findOne({
    where: { category_name, id_category: { [Op.not]: [id_category] } },
    transaction,
  });
  return category;
};

const getCategoryById = async (id_category, transaction) => {
  const category = await Category.findOne({ where: { id_category }, transaction });
  return category;
};

const updateData = async (id_category, category_image, category_name, transaction) => {
  let category;
  if (category_image) {
    category = await Category.update({ category_image, category_name }, { where: { id_category }, transaction });
  } else {
    category = await Category.update({ category_name }, { where: { id_category }, transaction });
  }
  return category;
};

const getCategoriesCount = async () => {
  const categoriesCount = await Category.findAll({
    where: { is_deleted: 0 },
    attributes: [[sequelize.fn("COUNT", sequelize.col("id_category")), "category_count"]],
  });
  return categoriesCount;
};

const deleteCategory = async (id_category, transaction) => {
  const deleteResult = await Category.update({ is_deleted: 1 }, { where: { id_category }, transaction });
  return deleteResult;
};

const getCategories = async (offset, limit, page) => {
  let categories;
  if (offset && limit && page) {
    categories = await Category.findAll({
      where: { is_deleted: 0 },
      offset: parseInt(offset) * (parseInt(page) - 1),
      limit: parseInt(limit),
    });
  } else {
    categories = await Category.findAll({ where: { is_deleted: 0 } });
  }
  return categories;
};

const createCategory = async (category_image, category_name, transaction) => {
  const newCategory = await Category.create({ category_image, category_name, is_deleted: 0 }, { transaction });
};

const createNewCategoryLogic = async (category_image, category_name, id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isNameExist = await getCategory(category_name, transaction);

    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };

    const result = await createCategory(category_image, category_name, transaction);

    transaction.commit();
    return { error: null, result };
  } catch (error) {
    await UnlinkPhoto(category_image);
    transaction.rollback();
    return { error, result: null };
  }
};

const editCategoryLogic = async (category_image, category_name, id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const isNameExist = await getCategoryByNameExceptSelf(category_name, id_category, transaction);
    if (isNameExist) throw { errMsg: "name already exists", statusCode: 400 };

    // get current image pattern data
    const getSingleData = await getCategoryById(id_category, transaction);
    const oldImage = getSingleData.dataValues.category_image;

    // update data
    const update = await updateData(id_category, category_image, category_name, transaction);

    // delete previous image pattern data
    if (category_image) await UnlinkPhoto(oldImage);

    transaction.commit();
    return { error: null, result: "halo" };
  } catch (error) {
    await UnlinkPhoto(category_image);
    transaction.rollback();
    return { error, result: null };
  }
};

const getCategoriesLogic = async (offset, limit, page) => {
  try {
    let categoriesCount;
    let totalPage;

    if (offset && limit && page) {
      categoriesCount = await getCategoriesCount();
      categoriesCount = categoriesCount[0].dataValues.category_count;
      totalPage = Math.ceil(categoriesCount / limit);
    }

    let categories = await getCategories(offset, limit, page);
    categories = categories.map((category) => {
      return category.dataValues;
    });

    const result = { categories, totalPage };
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};

const deleteCategoryLogic = async (id_category) => {
  const transaction = await db.sequelize.transaction();
  try {
    const response = await deleteCategory(id_category, transaction);
    if (response[0] !== 1) throw { errMsg: "not found", statusCode: 404 };
    transaction.commit();
    return { error: null, result: response };
  } catch (error) {
    transaction.rollback();
    return { error, result: null };
  }
};

module.exports = { createNewCategoryLogic, getCategoriesLogic, deleteCategoryLogic, editCategoryLogic };
