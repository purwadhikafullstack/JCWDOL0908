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
            <button
              id="approve-mutation-btn"
              className="bg-primary h-full py-1 text-white btn-disabled"
              onClick={approveBtnHandler}
              disabled={singleData.requester_deleted}
            >
              approve
            </button>
            <button
              id="reject-mutation-btn"
              className="bg-red-800 h-full py-1 text-white btn-disabled"
              onClick={rejectBtnHandler}
            >
              reject
            </button>
          </div>
          {singleData.requester_deleted ? (
            <h1 className="text-red-800 text-center text-xs md:text-sm w-5/6 md:w-2/3 mt-8">
              you must <i className="font-bold">reject</i> this request! Due to the requester-warehouse have been
              deleted/unoperated.
            </h1>
          ) : null}
        </div>
      )}
    </>
  );
}

export default RequestedAction;
