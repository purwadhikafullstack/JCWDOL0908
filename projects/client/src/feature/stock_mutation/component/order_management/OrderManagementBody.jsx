import React from "react";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import NoData from "../../../../components/NoData";
import RenderBodyData from "./RenderBodyData";
import AdminPagination from "../../../../components/AdminPagination";
import RenderOrderProducts from "./RenderOrderProducts";
import DetailOrder from "./DetailOrder";
import { useOrderMgtBody } from "../../util/useOrderMgtBody";

function OrderManagementBody(props) {
  const { admin, warehouses } = props;
  const {
    orderData,
    singleOrder,
    isSingleItemClicked,
    setSingleItemClicked,
    pageNum,
    setPageNum,
    totalPage,
    filterState,
    fetchingData,
    isWarehouseFilterDisabled,
    selectFilterOnChange,
    singleItemHandler,
  } = useOrderMgtBody(admin);

  const OrderMgtModals = () => {
    return (
      <>
        {isSingleItemClicked ? (
          <DetailOrder
            singleOrder={singleOrder}
            setSingleItemClicked={setSingleItemClicked}
            fetchingData={fetchingData}
          />
        ) : null}
      </>
    );
  };

  const OrderMgtFilters = () => {
    return (
      <form className="grid grid-cols-3 gap-4 md:gap-4 md:grid-cols-4 lg:grid-cols-5 text-xs md:text-sm lg:text-base h-4/5">
        <SelectFilter
          text="warehouse"
          filterOnChangeHandle={selectFilterOnChange}
          value={filterState?.warehouse}
          isDisabled={isWarehouseFilterDisabled()}
        >
          <RenderWarehouse warehouses={warehouses} />
        </SelectFilter>
        <SelectFilter text="status" filterOnChangeHandle={selectFilterOnChange} value={filterState?.status}>
          <option value={"waiting-for-payment"}>waiting for payment</option>
          <option value={"payment-confirmation"}>payment-confirmation</option>
          <option value={"rejected"}>rejected</option>
          <option value={"on-process"}>on-process</option>
          <option value={"sending"}>sending</option>
          <option value={"shipped"}>shipped</option>
          <option value={"canceled"}>canceled</option>
        </SelectFilter>
      </form>
    );
  };

  return (
    <>
      <OrderMgtModals />
      <OrderMgtFilters />
      <div className="row-span-10 grid grid-rows-8 gap-2 lg:gap-2">
        {orderData?.length ? (
          <RenderBodyData>
            <RenderOrderProducts orderData={orderData} singleItemHandler={singleItemHandler} />
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

export default OrderManagementBody;
