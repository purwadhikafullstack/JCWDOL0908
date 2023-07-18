import React, { useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import AdminHeaderPageLayout from "../components/AdminHeaderPageLayout";
import Body from "../feature/report/component/Body";

function ProductReport() {
  const [isProductHistoryClicked, setProductHistory] = useState(true);
  const [isSalesReportClicked, setSalesReport] = useState(false);
  const headerTitle = ["Product History", "Sales Report"];

  return (
    <LayoutAdmin>
      <div className="page-layout">
        <AdminHeaderPageLayout
          firstSubPageClicked={isProductHistoryClicked}
          setFirstSubPage={setProductHistory}
          SecondSubPageClicked={isSalesReportClicked}
          setSecondSubPage={setSalesReport}
          headerTitle={headerTitle}
          forPage="report"
        />
        <Body isProductHistoryClicked={isProductHistoryClicked} isSalesReportClicked={isSalesReportClicked} />
      </div>
    </LayoutAdmin>
  );
}

export default ProductReport;
