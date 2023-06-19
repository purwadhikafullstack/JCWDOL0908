import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";

export const UpdatePassword = async (data) => {
  const { oldPassword, newPassword } = data;
  return AxiosInstances.put("/users/password", { oldPassword, newPassword }, {
    headers: {
      authorization: `Bearer ${storage.getToken("token")}`,
    },
  });
};