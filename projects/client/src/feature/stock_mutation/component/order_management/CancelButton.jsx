import React from "react";

function CancelButton(props) {
  return (
    <button
      onClick={props.onClickFunction}
      id="cancel-order"
      className="bg-red-600 text-white py-1 px-3 font-semibold flex items-center text-center
      hover:bg-red-900 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-primaryLight"
    >
      <h1>cancel-order</h1>
    </button>
  );
}

export default CancelButton;
