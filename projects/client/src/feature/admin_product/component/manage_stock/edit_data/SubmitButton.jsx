import React from "react";

function SubmitButton(props) {
  const { selectedWarehouses, submitBtnHandler, text } = props;

  const noWarehouseSelected = () => {
    return !selectedWarehouses;
  };

  return (
    <button
      id="edit-stock-btn"
      disabled={noWarehouseSelected()}
      className="bg-primary text-white h-full disabled:bg-slate-300 disabled:hover:cursor-not-allowed"
      onClick={submitBtnHandler}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
