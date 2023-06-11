import React from "react";

function Pagination(props) {
  const { allUserData, addPageNum, minusPageNum, pageNum } = props;

  return (
    <>
      <div
        className="col-span-1 col-start-3 flex items-center 
                justify-center"
      >
        <button onClick={minusPageNum} disabled={pageNum === 1}>
          <i className="uil uil-arrow-left hover:cursor-pointer"></i>
        </button>
      </div>
      <div
        className="col-span-1 col-start-4 flex items-center 
                justify-center"
      >
        <p>{pageNum}</p>
      </div>
      <div
        className="col-span-1 col-start-5 flex items-center 
                justify-center"
      >
        <button onClick={addPageNum} disabled={pageNum === allUserData.totalPage}>
          <i className="uil uil-arrow-right hover:cursor-pointer"></i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
