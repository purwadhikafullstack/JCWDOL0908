import React from "react";

function TotalSales(props) {
  const { filterState, months, currencyFormat, totalSales } = props;
  return (
    <div className="row-span-4 flex items-center md:row-span-full bg-slate-100">
      <div className="px-6 md:px-10 text-primary font-bold text-base md:text-xl lg:text-2xl flex flex-col gap-2 md:gap-4">
        <h1>
          Total Sales{" "}
          {filterState.month && filterState.year ? `in ${months[filterState.month]}, ${filterState.year}` : `in 2023`}
        </h1>
        <h1
          className="py-1 bg-primary text-white px-2 md:px-2 lg:px-4
        text-lg md:text-2xl lg:text-4xl w-fit"
        >
          {currencyFormat(totalSales)}
        </h1>
      </div>
    </div>
  );
}

export default TotalSales;
