import AxiosInstances from "../../../helper/AxiosInstances";

export const resetPassword = (email) => {
  return AxiosInstances.post("/auth/forgot-password", { email });
};