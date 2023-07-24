import React from "react";

function RequesterAction(props) {
  const { singleData, acceptBtnHandler } = props;
  return (
    <>
      {singleData.is_approve && singleData.is_sending && !singleData.is_accepted ? (
        <div
          className="text-primary text-sm md:text-base lg:text-lg 
        my-4 w-full flex flex-col items-center gap-2"
        >
          <h1>
            Do you have <i className="font-bold">accepted</i> the delivered-product?
          </h1>
          <div
            className="font-bold text-xs md:text-sm lg:text-base 
          grid grid-cols-1 w-1/3 md:w-1/4 gap-2 md:gap-4 items-center"
          >
            <button
              id="accept-mutation-btn"
              className="bg-primary h-full py-1 text-white btn-disabled"
              onClick={acceptBtnHandler}
            >
              yes
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RequesterAction;
