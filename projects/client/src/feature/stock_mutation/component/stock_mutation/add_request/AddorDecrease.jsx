import React from "react";

function AddOrDecrease(props) {
  const { decreaseQty, addQty, qty, maxQty } = props;

  return (
    <div className="relative grid grid-cols-8 gap-2 items-center font-bold">
      <label className="text-left text-primary text-xs font-semibold my-0 col-span-2">quantity</label>
      <p className="font-semibold">:</p>
      <div className="col-span-5 p-1 border-2 border-slate-200 grid grid-cols-3 md:col-span-2 items-center">
        <button
          type="button"
          onClick={decreaseQty}
          className="text-red-800 hover:bg-red-800 hover:text-white text-center
        disabled:text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          disabled={qty === 1}
        >
          -
        </button>
        <p className={`text-center text-sm md:text-sm ${"selectedWarehouses" === "" ? "text-slate-400" : ""}`}>{qty}</p>
        <button
          type="button"
          onClick={addQty}
          disabled={qty >= maxQty}
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
