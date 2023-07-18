import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StockMutationBody from "./stock_mutation/StockMutationBody";
import OrderManagementBody from "./order_management/OrderManagementBody";
import { getWarehouses } from "../../admin_warehouse";

function Body(props) {
  const { isMutationClicked, isOrderClicked } = props;
  const admin = useSelector((state) => state.adminLogin.loggedInAdminData);
  const [warehouses, SetWarehouses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getWarehouses("");
      SetWarehouses([...response?.result]);
    })();
  }, []);

  return (
    <div className="row-span-6 grid grid-rows-12">
      {isMutationClicked && <StockMutationBody admin={admin} warehouses={warehouses} />}
      {isOrderClicked && <OrderManagementBody admin={admin} warehouses={warehouses} />}
    </div>
  );
}

export default Body;
