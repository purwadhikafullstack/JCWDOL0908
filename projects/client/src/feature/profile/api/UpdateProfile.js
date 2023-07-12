import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const UpdateProfile = async (data) => {
  return AxiosInstances.put("/users/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${storage.getToken("token")}`,
    },
  });
};

