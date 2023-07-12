import React from "react";

function AdminHeaderPageLayout(props) {
  const { firstSubPageClicked, setFirstSubPage, SecondSubPageClicked, setSecondSubPage, headerTitle, forPage } = props;

  const isItForWarehousePage = () => {
    return forPage === "warehouse";
  };

  return (
    <div className="w-full text-center row-span-2 grid grid-rows-4">
      <h1
        className="font-semibold text-2xl pt-8 row-span-2 
       text-primary lg:text-3xl font-title"
      >
        {firstSubPageClicked ? headerTitle[0] : headerTitle[1]} Management
      </h1>
      {isItForWarehousePage() ? (
        <div className="grid grid-cols-2 row-span-1 row-start-4 gap-20 lg:grid-cols-4 lg:gap-8">
          <button
            onClick={() => setFirstSubPage(true)}
            className="py-1 px-1 bg-primary text-white text-sm 
            font-semibold hover:bg-slate-800 lg:text-lg"
          >
            Warehouse <i className="uil uil-plus"></i>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 row-start-4 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
          <button
            disabled={firstSubPageClicked}
            onClick={() => {
              setFirstSubPage(true);
              setSecondSubPage(false);
            }}
            className="py-1 px-1 bg-primary text-white text-sm font-semibold hover:bg-slate-800
           lg:text-lg md:text-sm  disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
          >
            {headerTitle[0]}
          </button>
          <button
            disabled={SecondSubPageClicked}
            onClick={() => {
              setFirstSubPage(false);
              setSecondSubPage(true);
            }}
            className="py-1 px-1 bg-white text-primary text-sm 
          font-semibold border-primary border-2 hover:bg-slate-800 disabled:hover:cursor-not-allowed
          hover:text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border-primaryLight lg:text-lg"
          >
            {headerTitle[1]}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminHeaderPageLayout;
