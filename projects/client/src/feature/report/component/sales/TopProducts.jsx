import React from "react";
import NoData from "../../../../components/NoData";

function TopProducts(props) {
  const { topTwoProducts, currencyFormat, setAllProducts } = props;

  const cutString = (string) => {
    const limit = 20;
    return string.length > limit ? string.slice(0, limit) + "..." : string;
  };

  const RenderTopTwo = () => {
    return topTwoProducts?.map((product, index) => {
      return (
        <div
          key={index + 1}
          className="bg-secondary px-2 md:px-4 text-white font-medium text-xs py-2 md:py-2
            md:text-base grid grid-cols-9"
        >
          <h1 className="col-span-5">{cutString(product.product_name)}</h1>
          <h1 className="text-right col-span-4">{currencyFormat(parseInt(product.totalTransaction))}</h1>
        </div>
      );
    });
  };

  return (
    <>
      {topTwoProducts.length > 0 ? (
        <div
          id="category-sales"
          className="row-span-3 bg-slate-100 relative flex flex-col gap-4
        pt-2 md:pt-0 md:justify-center px-4"
        >
          <div
            className="text-primary text-sm py-[0.15rem] md:py-2
          md:text-base font-bold"
          >
            Top 2 Product Sales
          </div>
          <RenderTopTwo />
          <button
            onClick={() => setAllProducts(true)}
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

export default TopProducts;
