import AxiosInstances from "../../../helper/AxiosInstances";

export const registerBuyer = async (email) => {
  await AxiosInstances.post("/auth/register", {
    email,
  });
};
