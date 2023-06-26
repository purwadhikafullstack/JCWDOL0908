const db = require("../model");
const { Op } = require("sequelize");
const { Product, Category, ProductWarehouseRlt } = db;

/**
 * GetProducts retrieves a list of products with pagination and includes the stock count for each product.
 * @param {Object} data - Parameters for filtering and pagination.
 * @param {string} data.page - The page number.
 * @param {string} data.page_size - The number of items per page.
 * @param {string} data.name - The name to filter products by.
 * @param {[]number} data.id_category - The category ID to filter products by.
 * @param {number} data.price_min - The minimum price to filter products by.
 * @param {number} data.price_max - The maximum price to filter products by.
 * @param {string} data.sort_key - The key to sort products by.
 * @param {string} data.sort_condition - The sorting condition ("asc" or "desc").
 * @returns {Object} An object containing error status, data, and metadata.
 */
const listProducts = async (data) => {
  try {
    const {
      page = "1",
      page_size = "10",
      name,
      id_category,
      price_min,
      price_max,
      sort_key = "id_product",
      sort_condition = "desc",
    } = data;

    const offset = (parseInt(page) - 1) * parseInt(page_size);
    const limit = parseInt(page_size);

    const condition = {
      where: {
        is_deleted: false,
      },
    };

    if (name) {
      condition.where.product_name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (id_category) {
      condition.where.id_category = {
        [Op.in]: id_category.split(",").map((id) => parseInt(id)),
      };
    }

    if (price_min && price_max) {
      condition.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const sort = [[sort_key, sort_condition]];

    const { count, rows: products } = await Product.findAndCountAll({
      where: condition.where,
      include: {
        model: Category,
        attributes: ["category_name"],
      },
      offset,
      limit,
      order: sort,
    });

    const productIds = products.map((product) => product.id_product);

    const stockCounts = await ProductWarehouseRlt.findAll({
      attributes: ["id_product",
        [db.sequelize.fn("sum", db.sequelize.col("stock")), "total_stock"],
        [db.sequelize.fn("sum", db.sequelize.col("booked_stock")), "total_booked_stock"],
      ],
      where: {
        id_product: productIds,
      },
      group: ["id_product"],
    });

    const stockMap = stockCounts.reduce((map, count) => {
      const totalStock = parseInt(count.getDataValue("total_stock")) || 0;
      const totalBookedStock = parseInt(count.getDataValue("total_booked_stock")) || 0;
      map[count.id_product] = totalStock - totalBookedStock;
      return map;
    }, {});


    const updatedProducts = products.map((product) => ({
      ...product.toJSON(),
      stock: stockMap[product.id_product] || 0,
    }));

    const metadata = {
      total: parseInt(count),
      page: parseInt(page),
      page_size: parseInt(page_size),
      total_page: Math.ceil(count / limit),
    };

    return {
      error: false,
      data: {
        metadata,
        products: updatedProducts,
      },
    };
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};

/**
 * GetProduct retrieves a product by ID.
 * @param id
 * @returns {Object} An object containing error status and data.
 */
const getProduct = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: Category,
        attributes: ["category_name"],
      },
    });

    const stockCount = await ProductWarehouseRlt.findAll({
      attributes: [
        "id_product",
        [
          db.sequelize.fn("sum", db.sequelize.col("stock")),
          "total_stock"
        ],
        [
          db.sequelize.fn("sum", db.sequelize.col("booked_stock")),
          "total_booked_stock"
        ]
      ],
      where: {
        id_product: id
      },
      group: ["id_product"]
    });

    if (stockCount.length > 0) {
      product.dataValues.stock = stockCount[0].dataValues.total_stock - stockCount[0].dataValues.total_booked_stock;
      product.dataValues.booked_stock =  parseInt(stockCount[0].dataValues.total_booked_stock) || 0
    } else {
      product.dataValues.stock = 0;
      product.dataValues.booked_stock = 0;
    }

    return {
      error: false,
      data: product,
    };
  } catch (error) {
    return {
      error: error,
      data: null,
    };
  }
};

module.exports = {
  listProducts,
  getProduct,
};