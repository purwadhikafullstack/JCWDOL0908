const storage = {
  setToken: (token) => {
    localStorage.setItem("token", token);
  },
  getToken: (name) => {
    return localStorage.getItem(name || "token");
  },
  removeToken: (name) => {
    localStorage.removeItem(name || "token");
  },
};

export default storage;
