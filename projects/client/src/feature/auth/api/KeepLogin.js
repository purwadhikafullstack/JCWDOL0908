import AxiosInstances from "../../../helper/AxiosInstances";
import storage from "../../../helper/Storage";
export const keepLogin = async () => {
  return await AxiosInstances.get("/auth/keep-login", {
    headers: {
      authorization: `Bearer ${storage.getToken()}`,
    },
  });
};
