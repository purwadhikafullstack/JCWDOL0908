import React from "react";

function HeaderPage(props) {
  const { setCategoryClicked, isCategoryClicked, isProductClicked, setProductClicked } = props;
  return (
    <div className="w-full text-center row-span-2 grid grid-rows-4">
      <h1
        className="font-semibold text-2xl pt-8 row-span-2 
        text-slate-800 lg:text-3xl font-title"
      >
        {isProductClicked ? "Product Management" : "Category Management"}
      </h1>
      <div className="grid grid-cols-2 row-start-4 row-span-1 gap-20 lg:grid-cols-4 lg:gap-8">
        <button
          disabled={isCategoryClicked}
          onClick={() => {
            setCategoryClicked(true);
            setProductClicked(false);
          }}
          className="py-1 px-1 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900
           lg:text-lg md:text-sm  disabled:bg-slate-100 disabled:text-slate-400 disabled:hover:cursor-not-allowed"
        >
          Category
        </button>
        <button
          disabled={isProductClicked}
          onClick={() => {
            setCategoryClicked(false);
            setProductClicked(true);
          }}
          className="py-1 px-1 bg-white text-slate-800 text-sm 
          font-semibold border-slate-800 border-2 hover:bg-slate-950 disabled:hover:cursor-not-allowed
          hover:text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-400 lg:text-lg"
        >
          Product
        </button>
      </div>
    </div>
  );
}

export default HeaderPage;
