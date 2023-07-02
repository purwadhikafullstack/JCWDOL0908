import React, { useState } from "react";
import AddDataModal from "./add_data/AddDataModal";

function HeaderWarehouseMgt(props) {
  const { pageNum, setWarehouses } = props;
  const [isCreateBtnClicked, setIsCreateBtnClicked] = useState(false);

  return (
    <>
      {isCreateBtnClicked ? (
        <AddDataModal setIsCreateBtnClicked={setIsCreateBtnClicked} pageNum={pageNum} setWarehouses={setWarehouses} />
      ) : null}
      <div className="w-full text-center row-span-2 grid grid-rows-3 gap-8">
        <h1
          className="font-semibold text-2xl pt-8 row-span-2 
      text-slate-800 lg:text-3xl font-title"
        >
          Warehouse Management
        </h1>
        <div className="grid grid-cols-2 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
          <button
            onClick={() => setIsCreateBtnClicked(true)}
            className="py-1 px-1 bg-slate-800 text-white text-sm 
          font-semibold hover:bg-slate-900 lg:text-lg"
          >
            Warehouse <i className="uil uil-plus"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderWarehouseMgt;
