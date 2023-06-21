import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import HeaderWarehouseMgt from "../feature/admin_warehouse/component/HeaderWarehouseMgt";
import Body from "../feature/admin_warehouse/component/Body";
import { getWarehouses } from "../feature/admin_warehouse";

function WarehouseMgt() {
  const [warehouses, setWarehouses] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageWarehouse, setTotalPage] = useState(1);

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
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4">
        <HeaderWarehouseMgt pageNum={pageNum} setWarehouses={setWarehouses} />
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
