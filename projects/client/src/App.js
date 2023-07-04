import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Homepage from "./pages/client/Homepage";
import UserManagement from "./pages/UserManagement";
import ProductManagement from "./pages/ProductManagement";
import ProductOrder from "./pages/ProductOrder";
import ProductReport from "./pages/ProductReport";
import AdminLogin from "./pages/AdminLogin";
import { useSelector, useDispatch } from "react-redux";
import WarehouseMgt from "./pages/WarehouseMgt";
import { keepAdminLoggedIn } from "./feature/admin_auth";
import About from "./pages/client/About";
import Contact from "./pages/client/Contact";
import LoginClient from "./pages/client/auth/Login";
import VerificationAuth from "./pages/client/auth/Verification";
import Profile from "./pages/client/profile/Profile";
import Storage from "./helper/Storage";
import { KeepUser } from "./feature/auth/slice/UserSlice";
import ResetPassword from "./pages/client/profile/ResetPassword";
import Logout from "./pages/client/auth/Logout";
import ManageStock from "./pages/ManageStock";
import Address from "./pages/client/profile/Address";
import Products from "./pages/client/Products";
import ProductDetail from "./pages/client/ProductDetail";
import Cart from "./pages/client/Cart";
import Checkout from "./pages/client/Checkout";

function App() {
  // const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const loggedInAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);
  const isChecked = useSelector((state) => state.user.isChecked);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/greetings`);
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("admin_token")) dispatch(keepAdminLoggedIn());
    const userToken = Storage.getToken();
    dispatch(KeepUser(userToken));
  }, []);

  /**
   * TODO: Implement forbidden page apply protected route
   */
  if (!isChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/*Auth User Route*/}
        <Route path="/client" element={<LoginClient />} />
        <Route path="/verify" element={<VerificationAuth />} />

        {/*User Route*/}
        <Route path="/account" element={<Profile />} />
        <Route path="/account/address" element={<Address />} />
        <Route path="/account/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />

        {!loggedInAdmin.isLoggedIn && <Route path="/admin-login" element={<AdminLogin />} />}
        {loggedInAdmin.isLoggedIn && loggedInAdmin.is_admin ? (
          <>
            {loggedInAdmin.id_role === 1 ? (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/dashboard/user-management" element={<UserManagement />} />
                <Route path="/admin/dashboard/warehouse-management" element={<WarehouseMgt />} />
                <Route path="/admin/dashboard/product-management" element={<ProductManagement />} />
                <Route path="/admin/dashboard/product-management/stock" element={<ManageStock />} />
                <Route path="/admin/dashboard/order" element={<ProductOrder />} />
                <Route path="/admin/dashboard/report" element={<ProductReport />} />
              </>
            ) : (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/dashboard/order" element={<ProductOrder />} />
                <Route path="/admin/dashboard/report" element={<ProductReport />} />
                <Route path="/admin/dashboard/product-management" element={<ProductManagement />} />
                <Route path="/admin/dashboard/product-management/stock" element={<ManageStock />} />
              </>
            )}
            <Route path="/*" element={<AdminDashboard />} />
          </>
        ) : null}
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
