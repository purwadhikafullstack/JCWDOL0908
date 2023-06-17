import AxiosInstances from "../../../helper/AxiosInstances";

export const UpdateBio = async (data) => {
  const { username, phone } = data;
  return AxiosInstances.put("/users/update-bio", { username, phone }, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};