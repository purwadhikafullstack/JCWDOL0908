import React from "react";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import AdminPagination from "../../../../components/AdminPagination";
import RenderBodyData from "./RenderBodyData";
import NoData from "../../../../components/NoData";
import RenderCategoryOptions from "../../../admin_product/component/RenderCategoryOptions";
import RenderJournal from "./RenderJournal";
import DetailJournal from "./DetailJournal";
import { useProductHistoryBody } from "../../util/useProductHistoryBody";

function ProductHistoryBody(props) {
  const { admin } = props;
  const {
    pageNum,
    setPageNum,
    totalPage,
    journalData,
    categories,
    warehouses,
    singleJournal,
    isSingleItemClicked,
    setSingleItemClicked,
    filterState,
    months,
    selectingDate,
    selectFilterOnChange,
    isWarehouseFilterDisabled,
    singleItemHandler,
  } = useProductHistoryBody(admin);

  const RenderMonths = () => {
    return months.map((month, index) => {
      return (
        <option key={index} value={index}>
          {month}
        </option>
      );
    });
  };

  const JournalFilters = () => {
    return (
      <form className="grid grid-cols-4 gap-2 md:gap-4 md:grid-cols-4 lg:grid-cols-5 text-xs md:text-sm lg:text-base h-4/5">
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
        <SelectFilter text="category" filterOnChangeHandle={selectFilterOnChange} value={filterState?.category}>
          <RenderCategoryOptions categories={categories} />
        </SelectFilter>
      </form>
    );
  };

  return (
    <>
      {isSingleItemClicked ? (
        <DetailJournal
          setSingleItemClicked={setSingleItemClicked}
          singleJournal={singleJournal}
          months={months}
          filterState={filterState}
          selectingDate={selectingDate}
        />
      ) : null}
      <JournalFilters />
      <div className="row-span-10 grid grid-rows-10 gap-2 lg:gap-2">
        {journalData?.length ? (
          <RenderBodyData>
            <RenderJournal journalData={journalData} singleItemHandler={singleItemHandler} />
          </RenderBodyData>
        ) : (
          <NoData text="Data" />
        )}
      </div>
      <div className="pagination-container">
        <AdminPagination pageNum={pageNum} setPageNum={setPageNum} totalPage={totalPage} />
      </div>
    </>
  );
}

export default ProductHistoryBody;
