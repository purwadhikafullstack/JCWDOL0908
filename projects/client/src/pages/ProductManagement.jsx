import React, { useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Body from "../feature/admin_product/component/Body";
import AdminHeaderPageLayout from "../components/AdminHeaderPageLayout";

function ProductManagement() {
  const [isCategoryClicked, setCategoryClicked] = useState(true);
  const [isProductClicked, setProductClicked] = useState(false);
  const headerTitle = ["Category", "Product"];

  return (
    <LayoutAdmin>
      <div className="page-layout">
        <AdminHeaderPageLayout
          firstSubPageClicked={isCategoryClicked}
          setFirstSubPage={setCategoryClicked}
          SecondSubPageClicked={isProductClicked}
          setSecondSubPage={setProductClicked}
          headerTitle={headerTitle}
        />
        <Body isCategoryClicked={isCategoryClicked} isProductClicked={isProductClicked} />
      </div>
    </LayoutAdmin>
  );
}

export default ProductManagement;
