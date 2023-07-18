import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Body from "../feature/admin_warehouse/component/Body";
import { getWarehouses } from "../feature/admin_warehouse";
import AddDataModal from "../feature/admin_warehouse/component/add_data/AddDataModal";
import AdminHeaderPageLayout from "../components/AdminHeaderPageLayout";

function WarehouseMgt() {
  const [warehouses, setWarehouses] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isCreateBtnClicked, setIsCreateBtnClicked] = useState(false);
  const [totalPageWarehouse, setTotalPage] = useState(1);
  const headerTitle = ["", "Warehouse"];

  useEffect(() => {
    (async () => {
      const data = await getWarehouses(pageNum);
      const { result, totalPage } = data;
      await setTotalPage(totalPage);
      await setWarehouses([...result]);
    })();
  }, [pageNum]);

  return (
    <LayoutAdmin>
      <div className="page-layout">
        {isCreateBtnClicked ? (
          <AddDataModal setIsCreateBtnClicked={setIsCreateBtnClicked} pageNum={pageNum} setWarehouses={setWarehouses} />
        ) : null}
        <AdminHeaderPageLayout setFirstSubPage={setIsCreateBtnClicked} forPage="warehouse" headerTitle={headerTitle} />
        <Body
          pageNum={pageNum}
          warehouses={warehouses}
          setWarehouses={setWarehouses}
          setTotalPage={setTotalPage}
          setPageNum={setPageNum}
          totalPageWarehouse={totalPageWarehouse}
        />
      </div>
    </LayoutAdmin>
  );
}

export default WarehouseMgt;
