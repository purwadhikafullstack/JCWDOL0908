import AxiosInstances from "../../../helper/AxiosInstances";

export const ListProducts = (query) => {
  if (query.sort_key === "default") {
    delete query.sort_key;
    delete query.sort_condition;
  }
  const uQuery = new URLSearchParams(query).toString();
  return AxiosInstances.get("/products/client?" + uQuery);
};