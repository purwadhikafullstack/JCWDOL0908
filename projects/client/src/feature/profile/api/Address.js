import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const getUserAddresses = (page) => {
  return AxiosInstances.get(`/users/address?page=${page}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

export const addAddress = (data) => {
  return AxiosInstances.post("/users/address", data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

export const updateAddress = (address_id, data) => {
  return AxiosInstances.patch(`/users/address/${address_id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

export const removeAddress = (address_id) => {
  return AxiosInstances.delete(`/users/address/${address_id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

export const setPrimaryAddress = (address_id) => {
  return AxiosInstances.put(`/users/address/${address_id}/default`, {}, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};

export const getProvince = () => {
  return AxiosInstances.get("/address/provinces");
};

export const getCitiesByProvince = (province_id) => {
  return AxiosInstances.get(`/address/cities/${province_id}`);
};

export const getPrimaryAddress = () => {
  return AxiosInstances.get("/users/address/default", {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
};