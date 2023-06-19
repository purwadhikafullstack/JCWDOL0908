import React, { useState } from "react";
import Pagination from "./Pagination";
import RenderWarehouse from "./RenderWarehouse";
import DeleteModal from "./delete_data/DeleteModal";
import EditModal from "./edit_data/EditModal";

function Body(props) {
  const { pageNum, warehouses, setWarehouses, setTotalPage, setPageNum, totalPageWarehouse } = props;
  const [isDelBtnClicked, setIsDelBtnClicked] = useState(false);
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [warehouseData, setWarehouseData] = useState({});

  return (
    <>
      {isDelBtnClicked ? (
        <DeleteModal
          warehouseData={warehouseData}
          setIsDelBtnClicked={setIsDelBtnClicked}
          setWarehouses={setWarehouses}
          pageNum={pageNum}
          setTotalPage={setTotalPage}
        />
      ) : null}
      {isEditBtnClicked ? (
        <EditModal
          setIsEditBtnClicked={setIsEditBtnClicked}
          warehouseData={warehouseData}
          setWarehouses={setWarehouses}
          pageNum={pageNum}
        />
      ) : null}
      <div className="row-span-6 grid grid-rows-8">
        <div className="row-span-1 flex text-center items-center">
          <h1 className="text-lg font-semibold lg:text-xl">Warehouse List</h1>
        </div>
        <div className="row-span-6 grid grid-rows-10 gap-2 lg:gap-2">
          <div
            className="row-span-1 font-semibold grid lg:grid-cols-5
              grid-cols-6 items-center text-xs pl-2 lg:text-base"
          >
            <p className="col-span-1">warehouse</p>
            <p className="hidden lg:inline lg:col-span-1">address</p>
            <p className="col-span-2 text-center lg:text-left lg:col-span-1">city</p>
            <p className="col-span-2 lg:col-span-1 text-center">province</p>
            <p className="text-right">action</p>
          </div>
          <RenderWarehouse
            warehouses={warehouses}
            setIsDelBtnClicked={setIsDelBtnClicked}
            setIsEditBtnClicked={setIsEditBtnClicked}
            setWarehouseData={setWarehouseData}
          />
        </div>
        <div className="pagination-container">
          <Pagination pageNum={pageNum} totalPageWarehouse={totalPageWarehouse} setPageNum={setPageNum} />
        </div>
      </div>
    </>
  );
}

export default Body;
