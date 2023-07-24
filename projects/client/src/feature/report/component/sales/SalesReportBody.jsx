import React from "react";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import SalesBody from "./SalesBody";
import AllTopCategories from "./AllTopCategories";
import AllTopProducts from "./AllTopProducts";
import { useSalesReportBody } from "../../util/useSalesReportBody";

function SalesReportBody(props) {
  const { admin } = props;
  const {
    warehouses,
    totalSales,
    topTwoCategories,
    topTwoProducts,
    allTopCategories,
    setAllCategories,
    allTopProducts,
    setAllProducts,
    filterState,
    months,
    selectingDate,
    currencyFormat,
    isWarehouseFilterDisabled,
    selectFilterOnChange,
  } = useSalesReportBody(admin);

  const RenderMonths = () => {
    return months.map((month, index) => {
      return (
        <option key={index} value={index}>
          {month}
        </option>
      );
    });
  };

  const SalesReportModals = () => {
    return (
      <>
        {allTopCategories ? (
          <AllTopCategories
            setAllCategories={setAllCategories}
            filterState={filterState}
            months={months}
            warehouses={warehouses}
            selectingDate={selectingDate}
            currencyFormat={currencyFormat}
          />
        ) : null}
        {allTopProducts ? (
          <AllTopProducts
            setAllProducts={setAllProducts}
            filterState={filterState}
            months={months}
            warehouses={warehouses}
            selectingDate={selectingDate}
            currencyFormat={currencyFormat}
          />
        ) : null}
      </>
    );
  };

  const SalesReportFilters = () => {
    return (
      <form
        className="grid grid-cols-3 gap-2 
        md:gap-4 md:grid-cols-4 lg:grid-cols-5 text-xs 
        md:text-sm lg:text-base h-4/5"
      >
        <SelectFilter text="year" filterOnChangeHandle={selectFilterOnChange} value={filterState?.year}>
          <option value={2023}>2023</option>
        </SelectFilter>
        <SelectFilter text="month" filterOnChangeHandle={selectFilterOnChange} value={filterState?.month}>
          <RenderMonths />
        </SelectFilter>
        <SelectFilter
          text="warehouse"
          filterOnChangeHandle={selectFilterOnChange}
          value={filterState?.warehouse}
          isDisabled={isWarehouseFilterDisabled()}
        >
          <RenderWarehouse warehouses={warehouses} />
        </SelectFilter>
      </form>
    );
  };

  return (
    <>
      <SalesReportModals />
      <SalesReportFilters />
      <SalesBody
        filterState={filterState}
        months={months}
        totalSales={totalSales}
        topTwoCategories={topTwoCategories}
        topTwoProducts={topTwoProducts}
        setAllCategories={setAllCategories}
        setAllProducts={setAllProducts}
        currencyFormat={currencyFormat}
      />
    </>
  );
}

export default SalesReportBody;
