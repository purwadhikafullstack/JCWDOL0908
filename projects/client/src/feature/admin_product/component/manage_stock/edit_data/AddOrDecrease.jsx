import React from "react";

function AddOrDecrease(props) {
  const { decreaseQty, addQty, stockQty, selectedWarehouses } = props;

  const stockReachZero = () => {
    return stockQty === 0;
  };

  const noWarehouseSelected = () => {
    return !selectedWarehouses;
  };

  const doesStockDataExist = () => {
    return stockQty === undefined;
  };

  const isDecreaseBtnDisabled = () => {
    return stockReachZero() || noWarehouseSelected() || doesStockDataExist();
  };

  const isAddBtnDisabled = () => {
    return noWarehouseSelected() || doesStockDataExist();
  };

  return (
    <div className="relative grid grid-cols-8 gap-2 items-center font-bold">
      <label className="text-left text-primary text-xs font-semibold my-0 col-span-2">Quantity</label>
      <p className="font-semibold">:</p>
      <div className="col-span-5 p-1 border-2 border-slate-200 grid grid-cols-3 md:col-span-2 items-center">
        <button
          onClick={decreaseQty}
          className="text-red-800 hover:bg-red-800 hover:text-white text-center
        disabled:text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={isDecreaseBtnDisabled()}
        >
          -
        </button>
        <p className={`text-center text-sm md:text-lg ${selectedWarehouses === "" ? "text-slate-400" : ""}`}>
          {stockQty}
        </p>
        <button
          onClick={addQty}
          disabled={isAddBtnDisabled()}
          className="text-green-800 hover:bg-primary hover:text-white text-center
        disabled:text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default AddOrDecrease;
