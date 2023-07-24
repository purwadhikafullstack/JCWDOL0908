import React from "react";
import TotalSales from "./TotalSales";
import TopCategories from "./TopCategories";
import TopProducts from "./TopProducts";

function SalesBody(props) {
  const {
    filterState,
    months,
    totalSales,
    topTwoCategories,
    topTwoProducts,
    setAllCategories,
    currencyFormat,
    setAllProducts,
  } = props;

  return (
    <div className="row-span-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-2">
      <TotalSales filterState={filterState} months={months} totalSales={totalSales} currencyFormat={currencyFormat} />
      <div className="row-span-6 md:row-span-full grid grid-rows-6 gap-2 md:gap-4">
        <TopCategories
          topTwoCategories={topTwoCategories}
          currencyFormat={currencyFormat}
          setAllCategories={setAllCategories}
        />
        <TopProducts topTwoProducts={topTwoProducts} currencyFormat={currencyFormat} setAllProducts={setAllProducts} />
      </div>
    </div>
  );
}

export default SalesBody;
