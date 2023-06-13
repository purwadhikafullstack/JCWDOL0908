import AxiosInstances from "../../../helper/AxiosInstances";

export const loginWithEmailAndPassword = async (email, password) => {
  return await AxiosInstances.post("/auth", {
    email,
    password,
  });
};
