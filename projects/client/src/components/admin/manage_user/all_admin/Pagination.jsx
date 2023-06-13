import React from "react";

function Pagination(props) {
  const { minusPageNum, addPageNum, allAdmin, page } = props;
  return (
    <>
      <div
        className="col-span-1 col-start-3 flex items-center 
            justify-center lg:col-start-5"
      >
        <button onClick={minusPageNum} disabled={page === 1}>
          <i className="uil uil-arrow-left hover:cursor-pointer"></i>
        </button>
      </div>
      <div
        className="col-span-1 col-start-4 flex items-center 
            justify-center lg:col-start-6"
      >
        <p>{page}</p>
      </div>
      <div
        className="col-span-1 col-start-5 flex items-center 
            justify-center lg:col-start-7"
      >
        <button onClick={addPageNum} disabled={page === allAdmin.totalPage}>
          <i className="uil uil-arrow-right hover:cursor-pointer"></i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
