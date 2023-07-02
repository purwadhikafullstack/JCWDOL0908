import AxiosInstances from "../../../helper/AxiosInstances";

export const getCategories = (limit = 99999999, offset = 0, page = 1) => {
  return AxiosInstances.get(`/categories?offset=${offset}&limit=${limit}&page=${page}`);
};