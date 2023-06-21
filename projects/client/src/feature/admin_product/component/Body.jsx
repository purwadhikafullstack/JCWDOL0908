import React from "react";
import CategoryBody from "./categories/CategoryBody";
import ProductBody from "./product/ProductBody";
import { useSelector } from "react-redux";

function Body(props) {
  const { isCategoryClicked, isProductClicked } = props;
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);
  return (
    <div className="row-span-6 grid grid-rows-8">
      {isCategoryClicked ? (
        <>
          {admin.role_admin === "super-admin" ? (
            <CategoryBody />
          ) : (
            <div
              className="row-span-6 h-full w-full flex items-center justify-center 
            text-3xl text-slate-800 font-semibold lg:text-6xl"
            >
              Restricted Content
            </div>
          )}
        </>
      ) : (
        <ProductBody />
      )}
    </div>
  );
}

export default Body;
