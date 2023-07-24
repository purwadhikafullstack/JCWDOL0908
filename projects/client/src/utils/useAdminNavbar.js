import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInAdminDataBack } from "../feature/admin_auth/slice/AdminLogInSlice";

export const useAdminNavbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);

  const listNav = [
    {
      class: "uil uil-cog",
      text: "user",
      navlink: "/admin/dashboard/user-management",
    },
    {
      class: "uil uil-estate",
      text: "warehouse",
      navlink: "/admin/dashboard/warehouse-management",
    },
    {
      class: "uil uil-suitcase",
      text: "prod. & cat.",
      navlink: "/admin/dashboard/product-management",
    },
    {
      class: "uil uil-file-graph",
      text: "prod-order",
      navlink: "/admin/dashboard/order",
    },
    {
      class: "uil uil-analytics",
      text: "report",
      navlink: "/admin/dashboard/report",
    },
  ];

  const logoutBtnHandler = () => {
    localStorage.removeItem("admin_token");
    dispatch(setLoggedInAdminDataBack());
    navigate("/");
  };

  const onClickNavbarBtn = async (navItem) => {
    navigate(navItem.navlink);
  };

  return { toggleNav, setToggleNav, navigate, admin, listNav, logoutBtnHandler, onClickNavbarBtn };
};
