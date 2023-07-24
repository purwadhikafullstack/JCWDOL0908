import React from "react";
import NavbarRenderIcon from "./NavbarRenderIcon";
import { useAdminNavbar } from "../utils/useAdminNavbar";
import HamburgToggle from "./HamburgToggle";

function NavbarAdmin() {
  const { toggleNav, setToggleNav, navigate, admin, listNav, logoutBtnHandler, onClickNavbarBtn } = useAdminNavbar();

  const NavbarTitle = () => {
    return (
      <div
        onClick={() => navigate("/admin/dashboard")}
        className="invisible md:visible md:text-lg text-primary
        md:pt-4 md:pb-4 scale-y-110 font-bold lg:text-2xl hover:cursor-pointer font-title text-center"
      >
        <h1>warehouse</h1>
        <h1 className="font-bold font-body text-sm">{admin.username}</h1>
      </div>
    );
  };

  const NavbarIcons = () => {
    return (
      <ul
        id="navbar-items"
        className="grid grid-cols-3 gap-4 text-lg text-primary md:grid 
        md:grid-rows-6 md:grid-cols-1 md:gap-0 md:text-2xl py-4 lg:text-3xl"
      >
        <NavbarRenderIcon listNav={listNav} onClickNavbarBtn={onClickNavbarBtn} />
        <li
          className="text-center md:py-4 text-red-600 hover:text-white hover:bg-red-600 hover:cursor-pointer"
          onClick={logoutBtnHandler}
        >
          <i className="uil uil-signout"></i>
          <h2 className="text-base md:text-lg lg:text-xl">logout</h2>
        </li>
      </ul>
    );
  };

  const ClosedBtnNavbarAdmin = () => {
    return (
      <span
        className="md:invisible absolute top-2 right-0 text-red-900 text-sm hover:cursor-pointer"
        onClick={() => {
          setToggleNav(false);
        }}
      >
        <i className="uil uil-times-circle"></i>
      </span>
    );
  };

  return (
    <>
      <div
        className={
          toggleNav
            ? `visible z-50 md:top-0 md:left-0 absolute bottom-0 w-full px-4 shadow-primary shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-screen md:shadow-primary md:shadow-md
            md:py-0 lg:px-10 md:fixed md:visible bg-slate-50 md:rounded-none`
            : `invisible z-50 md:top-0 md:left-0 absolute bottom-0 w-full px-4 shadow-primary shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-screen md:shadow-primary md:shadow-md
            md:py-0 lg:px-10 md:fixed md:visible bg-slate-50 md:rounded-none`
        }
      >
        <div className="relative">
          <NavbarTitle />
          <NavbarIcons />
          <ClosedBtnNavbarAdmin />
        </div>
      </div>
      <HamburgToggle toggleNav={toggleNav} setToggleNav={setToggleNav} />
    </>
  );
}

export default NavbarAdmin;
