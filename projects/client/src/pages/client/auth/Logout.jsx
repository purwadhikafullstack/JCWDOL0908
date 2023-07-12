import { useEffect } from "react";
import storage from "../../../helper/Storage";

const Logout = () => {
  useEffect(() => {
    storage.removeToken("token");
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;