import NavbarClient from "./NavbarClient";
import FooterClient from "./FooterClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetCart } from "../feature/cart/slice/CartSlice";

function LayoutClient({ children }) {
  const isChecked = useSelector(state => state.user.isChecked);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isChecked && user.email) {
        dispatch(GetCart());
      }
    })();
  }, [isChecked]);

  return (
    <div className="flex flex-col">
      <NavbarClient />
      <main>
        <Loader />
        <ToastContainer />
        {children}
      </main>
      <FooterClient />
    </div>
  );
}

export default LayoutClient;
