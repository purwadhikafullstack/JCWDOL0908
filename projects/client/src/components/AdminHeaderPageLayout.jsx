import React from "react";

function AdminHeaderPageLayout(props) {
  const { firstSubPageClicked, setFirstSubPage, SecondSubPageClicked, setSecondSubPage, headerTitle, forPage } = props;

  const isItForWarehousePage = () => {
    return forPage === "warehouse";
  };

  const RenderForWarehouseMgtPage = () => {
    return (
      <div className="grid grid-cols-2 row-span-1 row-start-4 gap-20 lg:grid-cols-4 lg:gap-8">
        <button
          onClick={() => setFirstSubPage(true)}
          className="py-1 px-1 bg-primary text-white text-sm 
          font-semibold hover:bg-slate-800 lg:text-lg"
        >
          Warehouse <i className="uil uil-plus"></i>
        </button>
      </div>
    );
  };

  const HeaderPageTitle = () => {
    return (
      <h1
        className="font-semibold text-2xl pt-8 row-span-2 
        text-primary lg:text-3xl font-title"
      >
        {firstSubPageClicked ? headerTitle[0] : headerTitle[1]} {forPage === "report" ? "" : "Management"}
      </h1>
    );
  };

  return (
    <div className="w-full text-center row-span-2 grid grid-rows-4">
      <HeaderPageTitle />
      {isItForWarehousePage() ? (
        <RenderForWarehouseMgtPage />
      ) : (
        <div className="grid grid-cols-2 row-start-4 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
          <button
            disabled={firstSubPageClicked}
            onClick={() => {
              setFirstSubPage(true);
              setSecondSubPage(false);
            }}
            className="py-1 px-1 text-sm bg-slate-100 text-slate-400  
            font-semibold hover:bg-slate-800 hover:text-white
           lg:text-lg md:text-sm disabled:hover:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-400"
          >
            {headerTitle[0]}
          </button>
          <button
            disabled={SecondSubPageClicked}
            onClick={() => {
              setFirstSubPage(false);
              setSecondSubPage(true);
            }}
            className="py-1 px-1 text-sm bg-slate-100 text-slate-400 
          font-semibold hover:bg-slate-800 disabled:hover:cursor-not-allowed
          hover:text-white lg:text-lg disabled:hover:bg-slate-100 disabled:hover:text-slate-400"
          >
            {headerTitle[1]}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminHeaderPageLayout;
