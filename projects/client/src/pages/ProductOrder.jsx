import React, { useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import AdminHeaderPageLayout from "../components/AdminHeaderPageLayout";
import Body from "../feature/stock_mutation/component/Body";

function ProductOrder() {
  const [isMutationClicked, setMutationClicked] = useState(true);
  const [isOrderClicked, setOrderClicked] = useState(false);
  const headerTitle = ["Stock Mutation", "User's Order"];
  return (
    <LayoutAdmin>
      <div className="page-layout">
        <AdminHeaderPageLayout
          firstSubPageClicked={isMutationClicked}
          setFirstSubPage={setMutationClicked}
          SecondSubPageClicked={isOrderClicked}
          setSecondSubPage={setOrderClicked}
          headerTitle={headerTitle}
        />
        <Body isMutationClicked={isMutationClicked} isOrderClicked={isOrderClicked} />
      </div>
    </LayoutAdmin>
  );
}

export default ProductOrder;
