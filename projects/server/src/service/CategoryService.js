const db = require("../model");
const { Category, sequelize } = db;
const { Op } = require("sequelize");

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
  return newCategory;
};

module.exports = {
  deleteCategory,
  getCategoriesCount,
  getCategories,
  getCategoryByNameExceptSelf,
  getCategoryById,
  updateData,
  getCategory,
  createCategory,
};
