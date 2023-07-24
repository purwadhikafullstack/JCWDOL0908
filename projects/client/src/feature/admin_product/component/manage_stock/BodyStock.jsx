import React from "react";
import AdminPagination from "../../../../components/AdminPagination";
import RenderProduct from "./RenderProduct";
import EditModal from "./edit_data/EditModal";
import DeleteModal from "./delete_data/DeleteModal";
import { useStockBody } from "../../util/useStockBody";

function BodyStock(props) {
  const { productsList, totalPage, setPageNum, pageNum, userAdmin, refetchedData } = props;
  const {
    warehouses,
    singleProduct,
    isEditClicked,
    setEditClicked,
    isDeleteClicked,
    setDeleteClicked,
    productStock,
    editBtnHndler,
    deleteBtnHandler,
  } = useStockBody(userAdmin);

  const ManageStockModals = () => {
    return (
      <>
        {isEditClicked ? (
          <EditModal
            setEditClicked={setEditClicked}
            warehouses={warehouses}
            productStock={productStock}
            userAdmin={userAdmin}
            singleProduct={singleProduct}
            refetchedData={refetchedData}
          />
        ) : null}
        {isDeleteClicked ? (
          <DeleteModal
            setDeleteClicked={setDeleteClicked}
            warehouses={warehouses}
            productStock={productStock}
            userAdmin={userAdmin}
            singleProduct={singleProduct}
            refetchedData={refetchedData}
          />
        ) : null}
      </>
    );
  };

  const ManageStockDataBody = () => {
    return (
      <div className="row-span-11 grid grid-rows-10 gap-2 lg:gap-2">
        <div className="row-span-1 font-semibold grid grid-cols-6 items-end text-xs pl-2 md:text-sm lg:text-base">
          <p className="col-span-2">name</p>
          <p className="hidden lg:inline lg:col-span-1">weight (kg)</p>
          <p className="col-span-1  lg:col-span-1 text-center ">stock</p>
          <p className="col-span-2 lg:col-span-1 text-center">booked qty</p>
          <p className="text-right">action</p>
        </div>
        <RenderProduct productsList={productsList} editBtnHndler={editBtnHndler} deleteBtnHandler={deleteBtnHandler} />
      </div>
    );
  };

  return (
    <>
      <ManageStockModals />
      <div className="row-span-6 grid grid-rows-12">
        <ManageStockDataBody />
        <div className="pagination-container">
          <AdminPagination setPageNum={setPageNum} pageNum={pageNum} totalPage={totalPage} />
        </div>
      </div>
    </>
  );
}

export default BodyStock;
