import React from "react";
import AdminPagination from "../../../../components/AdminPagination";
import RenderBodyData from "../../../../components/RenderBodyData";
import AddModal from "./add_request/AddModal";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import RenderMutationData from "../RenderMutationData";
import NoData from "../../../../components/NoData";
import UpdateModal from "./update_mutation/UpdateModal";
import { useStockMutationBody } from "../../util/useStockMutationBody";

function StockMutationBody(props) {
  const { admin, warehouses } = props;
  const {
    createNewRequest,
    setNewRequest,
    pageNum,
    setPageNum,
    totalPage,
    filterState,
    mutationList,
    singleItemClicked,
    setSingleItemClicked,
    singleData,
    warehouseOnChange,
    mutationOnChange,
    statusOnChange,
    singleItemClickedHandler,
    isWarehouseFilterDisabled,
    fetchingData,
  } = useStockMutationBody(admin);

  const StockMutationModals = () => {
    return (
      <>
        {createNewRequest ? (
          <AddModal fetchingData={fetchingData} admin={admin} warehouse={warehouses} setNewRequest={setNewRequest} />
        ) : null}
        {singleItemClicked ? (
          <UpdateModal
            setSingleItemClicked={setSingleItemClicked}
            admin={admin}
            singleData={singleData}
            fetchingData={fetchingData}
          />
        ) : null}
      </>
    );
  };

  const StockMutationFilters = () => {
    return (
      <form className="grid grid-cols-3 gap-4 md:gap-4 md:grid-cols-4 lg:grid-cols-5 text-xs md:text-sm lg:text-base h-4/5">
        <SelectFilter
          text="warehouse"
          filterOnChangeHandle={warehouseOnChange}
          value={filterState?.id_warehouse}
          isDisabled={isWarehouseFilterDisabled()}
        >
          <RenderWarehouse warehouses={warehouses} />
        </SelectFilter>
        <SelectFilter text="mutation-type" filterOnChangeHandle={mutationOnChange} value={filterState?.mutationType}>
          <option value={"mutation-in"}>mutation-in</option>
          <option value={"mutation-out"}>mutation-out</option>
        </SelectFilter>
        <SelectFilter text="status" filterOnChangeHandle={statusOnChange} value={filterState?.status}>
          <option value={"approval-request"}>approval-request</option>
          <option value={"on-delivery"}>on-delivery</option>
          <option value={"rejected"}>rejected</option>
          <option value={"done"}>shipped</option>
        </SelectFilter>
      </form>
    );
  };

  return (
    <>
      <StockMutationModals />
      <StockMutationFilters />
      <div className="row-span-9 grid grid-rows-8 gap-2 lg:gap-2">
        {mutationList.length ? (
          <RenderBodyData>
            <RenderMutationData dataList={mutationList} singleItemClickedHandler={singleItemClickedHandler} />
          </RenderBodyData>
        ) : (
          <NoData text="Data" />
        )}
      </div>
      <div className="row-span-1 grid grid-cols-2 items-center">
        <button
          className="bg-primary text-white px-2 py-1 text-sm 
          font-semibold lg:w-1/3 disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-primaryLight disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={() => setNewRequest(true)}
        >
          <i className="uil uil-plus"></i> New Request
        </button>
      </div>
      <div className="pagination-container">
        <AdminPagination pageNum={pageNum} setPageNum={setPageNum} totalPage={totalPage} />
      </div>
    </>
  );
}

export default StockMutationBody;
