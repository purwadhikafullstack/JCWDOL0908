import React from "react";

function RenderWarehouse(props) {
  const { warehouses, setIsDelBtnClicked, setWarehouseData, setIsEditBtnClicked } = props;

  const deleteBtnClicked = (index) => {
    setWarehouseData({ ...warehouses[index] });
    setIsDelBtnClicked(true);
  };

  const editBtnClicked = (index) => {
    setWarehouseData({ ...warehouses[index] });
    setIsEditBtnClicked(true);
  };

  const cutString = (string) => {
    return string.length > 13 ? string.slice(0, 10) + "..." : string;
  };

  return warehouses.map((warehouse, index) => {
    return (
      <div
        key={warehouse.warehouse_name}
        className="row-span-1 grid lg:grid-cols-5
      grid-cols-6 items-center text-xs pl-2 lg:text-base bg-slate-100"
      >
        <p className="col-span-1">{cutString(warehouse.warehouse_name)}</p>
        <p className="hidden lg:inline lg:col-span-1">{cutString(warehouse.address)}</p>
        <p className="col-span-2 text-center lg:text-left lg:col-span-1">
          {cutString(warehouse.type_city + " " + warehouse.city)}
        </p>
        <p className="col-span-2 lg:col-span-1 text-center">{cutString(warehouse.province)}</p>
        <div className="col-span-1 grid grid-cols-2 h-full lg:grid-cols-4">
          <button
            className="col-span-1 bg-slate-300 text-slate-800 h-full lg:col-start-3"
            onClick={() => editBtnClicked(index)}
          >
            <i className="uil uil-pen"></i>
          </button>
          <button
            className="col-span-1 bg-red-600 text-white h-full lg:col-start-4"
            onClick={() => deleteBtnClicked(index)}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderWarehouse;
