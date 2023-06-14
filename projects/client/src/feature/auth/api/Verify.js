import AxiosInstances from "../../../helper/AxiosInstances";

export const VerifyAccount = async (token, password) => {
  return await AxiosInstances.put("/auth/verify", {
    token,
    password,
  });
}