import React from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import HeaderStock from "../feature/admin_product/component/manage_stock/HeaderStock";
import BodyStock from "../feature/admin_product/component/manage_stock/BodyStock";
import { useManageStockBody } from "../feature/admin_product/util/useManageStockBody";

function ManageStock() {
  const {
    categories,
    pageNum,
    setPageNum,
    totalPage,
    productsList,
    userAdmin,
    inputOnChangeHandler,
    filterOnChangeHandle,
    refetchedData,
  } = useManageStockBody();

  return (
    <LayoutAdmin>
      <div className="page-layout ">
        <HeaderStock
          categories={categories}
          inputOnChangeHandler={inputOnChangeHandler}
          filterOnChangeHandle={filterOnChangeHandle}
        />
        <BodyStock
          productsList={productsList}
          totalPage={totalPage}
          setPageNum={setPageNum}
          pageNum={pageNum}
          userAdmin={userAdmin}
          refetchedData={refetchedData}
        />
      </div>
    </LayoutAdmin>
  );
}

export default ManageStock;
