import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Homepage from "./pages/Homepage";
import UserManagement from "./pages/UserManagement";
import ProductManagement from "./pages/ProductManagement";
import ProductOrder from "./pages/ProductOrder";
import ProductReport from "./pages/ProductReport";
import AdminLogin from "./pages/AdminLogin";
import { useSelector, useDispatch } from "react-redux";
import { keepAdminLoggedIn } from "./feature/admin/AdminLogInSlice";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const loggedInAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/greetings`);
      setMessage(data?.message || "");
    })();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("admin_token")) dispatch(keepAdminLoggedIn());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {!loggedInAdmin.isLoggedIn && <Route path="/admin-login" element={<AdminLogin />} />}

        {loggedInAdmin.isLoggedIn && loggedInAdmin.is_admin ? (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/user-management" element={<UserManagement />} />
            <Route path="/admin/dashboard/product-management" element={<ProductManagement />} />
            <Route path="/admin/dashboard/order" element={<ProductOrder />} />
            <Route path="/admin/dashboard/report" element={<ProductReport />} />
            <Route path="/*" element={<AdminDashboard />} />
          </>
        ) : null}
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
