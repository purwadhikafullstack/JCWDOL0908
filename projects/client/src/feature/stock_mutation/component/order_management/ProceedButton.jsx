import React from "react";

function ProceedButton(props) {
  const { onClickFunction, text } = props;
  return (
    <button
      onClick={onClickFunction}
      id={`${text}-order`}
      className={`${
        text === "reject" ? "bg-red-600 hover:bg-red-800" : "bg-primary hover:bg-slate-900"
      } text-white py-1 px-3 font-semibold flex items-center text-center
      disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-primaryLight`}
    >
      <h1>{text}</h1>
    </button>
  );
}

export default ProceedButton;
