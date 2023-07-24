import { axiosInstanceStockUpdate } from "../slice/ProductStockSlice";

export const getProductsStocks = async (offset, limit, page, name_search, id_category, id_warehouse) => {
  name_search = name_search ? name_search : "null";
  id_category = id_category ? id_category : "null";
  id_warehouse = id_warehouse ? id_warehouse : "null";
  try {
    const response = await axiosInstanceStockUpdate.get(
      `?offset=${offset}&limit=${limit}&page=${page}&name_search=${name_search}&id_category=${id_category}&id_warehouse=${id_warehouse}`,
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const getStock = async (id_product, id_warehouse) => {
  id_warehouse = id_warehouse ? id_warehouse : "null";
  try {
    const response = await axiosInstanceStockUpdate.get(`/${id_product}?id_warehouse=${id_warehouse}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const updateStock = async (id_product, id_warehouse, newStock) => {
  try {
    const response = await axiosInstanceStockUpdate.patch(`/${id_product}`, { id_warehouse, newStock });
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response.data.message);
    return error.response?.data;
  }
};

export const createNewStock = async (id_product, id_warehouse) => {
  try {
    const response = await axiosInstanceStockUpdate.post(`/${id_product}?id_warehouse=${id_warehouse}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response.data.message);
    return error.response?.data;
  }
};

export const deleteStock = async (id_product, id_warehouse) => {
  try {
    const response = await axiosInstanceStockUpdate.patch(`/${id_product}/delete?id_warehouse=${id_warehouse}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response.data.message);
    return error.response?.data;
  }
};

export const getWarehouseWhichProvideProduct = async (id_product) => {
  try {
    const response = await axiosInstanceStockUpdate.get(`/${id_product}/warehouses`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response.data.message);
  }
};

export const getListOfProductsInWarehouse = async (listOfProduct, id_warehouse) => {
  try {
    const response = await axiosInstanceStockUpdate.get(`/${id_warehouse}/products?listOfProductsId=${listOfProduct}`);
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response.data.message);
  }
};
