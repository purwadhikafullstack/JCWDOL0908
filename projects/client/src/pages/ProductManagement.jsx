import React, { useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Body from "../feature/admin_product/component/Body";
import HeaderPage from "../feature/admin_product/component/HeadersPage";

function ProductManagement() {
  const [isCategoryClicked, setCategoryClicked] = useState(true);
  const [isProductClicked, setProductClicked] = useState(false);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <HeaderPage
          setCategoryClicked={setCategoryClicked}
          isCategoryClicked={isCategoryClicked}
          isProductClicked={isProductClicked}
          setProductClicked={setProductClicked}
        />
        <Body isCategoryClicked={isCategoryClicked} isProductClicked={isProductClicked} />
      </div>
    </LayoutAdmin>
  );
}

export default ProductManagement;
