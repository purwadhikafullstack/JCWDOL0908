import React from "react";

function RequestedAction(props) {
  const { singleData, approveBtnHandler, rejectBtnHandler } = props;
  return (
    <>
      {singleData.is_approve || singleData.is_reject ? null : (
        <div
          className="text-primary text-sm md:text-base lg:text-lg 
        my-4 w-full flex flex-col items-center gap-2"
        >
          <h1>
            Will you <i className="font-bold">approve</i> this request?
          </h1>
          <div
            className="font-bold text-xs md:text-sm lg:text-base 
          grid grid-cols-2 w-1/2 md:w-1/3 gap-2 md:gap-4 items-center"
          >
            <button className="bg-primary h-full py-1 text-white" onClick={approveBtnHandler}>
              approve
            </button>
            <button className="bg-red-800 h-full py-1 text-white" onClick={rejectBtnHandler}>
              reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RequestedAction;
