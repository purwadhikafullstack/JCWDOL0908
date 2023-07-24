import React from "react";
import NoData from "../../../../components/NoData";

function TopCategories(props) {
  const { topTwoCategories, currencyFormat, setAllCategories } = props;

  const RenderTopTwo = () => {
    return topTwoCategories?.map((category, index) => {
      return (
        <div
          key={index + 1}
          className="bg-secondary px-2 md:px-4 text-white font-medium text-xs py-2 md:py-2
        md:text-base grid grid-cols-9"
        >
          <h1 className="col-span-5 lg:col-span-3 font-bold">{category.category_name}</h1>
          <h1 className="hidden lg:inline-block lg:col-span-2 lg:text-center">{category.totalItem} item(s)</h1>
          <h1 className="text-right col-span-4">{currencyFormat(parseInt(category.totalTransaction))}</h1>
        </div>
      );
    });
  };

  return (
    <>
      {topTwoCategories.length > 0 ? (
        <div
          id="category-sales"
          className="row-span-3 bg-slate-100 relative flex flex-col gap-4
          pt-2 md:pt-0 md:justify-center px-4"
        >
          <div
            className="text-primary text-sm py-[0.15rem] md:py-2
            md:text-base font-bold"
          >
            Top 2 Categories Sales
          </div>
          <RenderTopTwo />
          <button
            onClick={() => setAllCategories(true)}
            className=" text-xs absolute bottom-1 text-primary font-bold md:bottom-1 right-2"
          >
            see more
          </button>
        </div>
      ) : (
        <div id="category-sales" className="row-span-3 bg-slate-100 grid grid-rows-4 px-4">
          <NoData text="data" />
        </div>
      )}
    </>
  );
}

export default TopCategories;
