const storage = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },
  getToken: (name) => {
    return localStorage.getItem(name || "token");
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
};

export default storage;
