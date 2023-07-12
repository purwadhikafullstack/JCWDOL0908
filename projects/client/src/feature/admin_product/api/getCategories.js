import { axiosInstance } from "../slice/CategorySlice";

export const getCategories = async (page) => {
  const TOKEN = localStorage.getItem("admin_token");
  try {
    let response;
    if (page) {
      response = await axiosInstance.get(`?limit=4&page=${page}&offset=4`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
    } else {
      response = await axiosInstance.get("/", { headers: { Authorization: `Bearer ${TOKEN}` } });
    }
    const result = response.data.result;
    return result;
  } catch (error) {
    console.log(error);
  }
};
