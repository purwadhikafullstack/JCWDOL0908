import React, { useState } from "react";
import NavbarRenderIcon from "./navbar/NavbarRenderIcon";

function NavbarAdmin() {
  const [toggleNav, setToggleNav] = useState(false);

  const listNav = [
    {
      class: "uil uil-cog",
      text: "user-mgt",
      navlink: "/admin/dashboard/user-management",
    },
    {
      class: "uil uil-suitcase",
      text: "product-mgt",
      navlink: "/admin/dashboard/product-management",
    },
    {
      class: "uil uil-file-graph",
      text: "product-order",
      navlink: "/admin/dashboard/order",
    },
    {
      class: "uil uil-analytics",
      text: "product-report",
      navlink: "/admin/dashboard/report",
    },
  ];

  return (
    <>
      <div
        className={
          toggleNav
            ? `visible z-50 md:top-0 md:left-0 fixed bottom-0 w-full px-4 shadow-slate-800 shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-full md:shadow-slate-800 md:shadow-md
            md:py-0 lg:px-10 md:visible bg-slate-50 md:rounded-none`
            : `invisible z-50 md:top-0 md:left-0 fixed bottom-0 w-full px-4 shadow-slate-800 shadow-2xl 
            rounded-t-2xl md:px-6 md:w-fit md:col-span-2 md:h-full md:shadow-slate-800 md:shadow-md
            md:py-0 lg:px-10 md:visible bg-slate-50 md:rounded-none`
        }
      >
        <div className="relative">
          <h1
            className="invisible md:visible md:text-lg text-slate-800 tracking-tighter
      md:py-10 scale-y-110 font-bold lg:text-2xl"
          >
            WarehouseKu
          </h1>
          <ul
            className="grid grid-cols-3 gap-4 text-lg text-slate-700 md:grid 
      md:grid-rows-6 md:grid-cols-1 md:gap-8 md:text-2xl py-8 lg:text-3xl"
          >
            <NavbarRenderIcon listNav={listNav} />
            <li className="md:invisible"></li>
            <li className="text-center hover:text-black hover:cursor-pointer">
              <i className="uil uil-signout"></i>
              <h2 className=" text-sm md:text-lg">logout</h2>
            </li>
          </ul>
          <span
            className="md:invisible absolute top-2 right-0 text-red-900 text-sm hover:cursor-pointer"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <i className="uil uil-times-circle"></i>
          </span>
        </div>
      </div>
      <div
        className={
          toggleNav
            ? `invisible fixed bottom-4 right-4 text-2xl text-center
            md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-slate-800
             self-center text-white rounded-full flex flex-row justify-center
              items-center`
            : `visible fixed bottom-4 right-4 text-2xl text-center
            md:invisible hover:cursor-pointer z-0 h-10 w-10 bg-slate-800
             self-center text-white rounded-full flex flex-row justify-center
              items-center`
        }
        onClick={() => {
          setToggleNav(true);
        }}
      >
        <i className="uil uil-align-center-alt"></i>
      </div>
    </>
  );
}

export default NavbarAdmin;
