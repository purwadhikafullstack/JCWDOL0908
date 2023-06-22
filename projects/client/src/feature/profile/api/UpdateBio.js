import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const UpdateBio = async (data) => {
  const { username, phone } = data;
  return AxiosInstances.put("/users/bio", { username, phone }, {
    headers: {
      authorization: `Bearer ${storage.getToken("token")}`,
    },
  });
};