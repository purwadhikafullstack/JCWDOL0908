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

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/greetings`);
      setMessage(data?.message || "");
    })();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/dashboard/user-management" element={<UserManagement />} />
        <Route path="admin/dashboard/product-management" element={<ProductManagement />} />
        <Route path="admin/dashboard/order" element={<ProductOrder />} />
        <Route path="admin/dashboard/report" element={<ProductReport />} />
      </Routes>
    </div>
  );
}

export default App;
