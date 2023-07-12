import React from "react";
import { useSelector } from "react-redux";
import StockMutationBody from "./stock_mutation/StockMutationBody";
import OrderManagementBody from "./order_management/OrderManagementBody";

function Body(props) {
  const { isMutationClicked, isOrderClicked } = props;
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);

  return (
    <div className="row-span-6 grid grid-rows-12">
      {isMutationClicked && <StockMutationBody admin={admin} />}
      {isOrderClicked && <OrderManagementBody />}
    </div>
  );
}

export default Body;
