import React from "react";

function Pagination(props) {
  const { pageNum, setPageNum, totalPageWarehouse } = props;

  const addPageNum = async () => {
    setPageNum(pageNum + 1);
  };

  const minusPageNum = async () => {
    setPageNum(pageNum - 1);
  };

  return (
    <>
      <div
        className="col-span-1 col-start-3 flex items-center 
    justify-center lg:col-start-5"
      >
        <button onClick={minusPageNum} disabled={pageNum === 1}>
          <i className="uil uil-arrow-left hover:cursor-pointer"></i>
        </button>
      </div>
      <div className="col-span-1 col-start-4 flex items-center justify-center lg:col-start-6">
        <p>{pageNum}</p>
      </div>
      <div className="col-span-1 col-start-5 flex items-center justify-center lg:col-start-7">
        <button onClick={addPageNum} disabled={pageNum === totalPageWarehouse}>
          <i className="uil uil-arrow-right hover:cursor-pointer"></i>
        </button>
      </div>
    </>
  );
}

export default Pagination;
