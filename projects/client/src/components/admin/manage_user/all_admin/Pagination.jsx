import React from "react";

function Pagination(props) {
  const { minusPageNum, addPageNum, allAdmin, page } = props;
  return (
    <>
      <div
        className="col-span-1 col-start-3 flex items-center 
            justify-center"
      >
        <button onClick={minusPageNum} disabled={page === 1}>
          <i className="uil uil-arrow-left hover:cursor-pointer"></i>
        </button>
      </div>
      <div
        className="col-span-1 col-start-4 flex items-center 
            justify-center"
      >
        <p>{page}</p>
      </div>
      <div
        className="col-span-1 col-start-5 flex items-center 
            justify-center"
      >
        <button onClick={addPageNum} disabled={page === allAdmin.totalPage}>
          <i className="uil uil-arrow-right hover:cursor-pointer"></i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
