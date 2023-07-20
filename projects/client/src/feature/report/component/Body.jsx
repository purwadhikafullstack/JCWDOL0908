import React from "react";
import { useSelector } from "react-redux";
import ProductHistoryBody from "./product/ProductHistoryBody";
import SalesReportBody from "./sales/SalesReportBody";

function Body(props) {
  const { isSalesReportClicked, isProductHistoryClicked } = props;
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);
  return (
    <div className="row-span-6 grid grid-rows-12">
      {isProductHistoryClicked && <ProductHistoryBody admin={admin} />}
      {isSalesReportClicked && <SalesReportBody />}
    </div>
  );
}

export default Body;
