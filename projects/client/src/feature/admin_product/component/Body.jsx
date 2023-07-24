import React from "react";
import CategoryBody from "./categories/CategoryBody";
import ProductBody from "./product/ProductBody";
import { useSelector } from "react-redux";
import RestrictedContent from "./RestrictedContent";

function Body(props) {
  const { isCategoryClicked, isProductClicked } = props;
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);

  const isSuperAdmin = () => {
    return admin.role_admin === "super-admin";
  };

  return (
    <div className="row-span-6 grid grid-rows-12">
      {isCategoryClicked && <>{isSuperAdmin() ? <CategoryBody admin={admin} /> : <RestrictedContent />}</>}
      {isProductClicked && <ProductBody admin={admin} />}
    </div>
  );
}

export default Body;
