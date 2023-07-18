import React, { useEffect, useState } from "react";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import NoData from "../../../../components/NoData";
import RenderBodyData from "./RenderBodyData";
import AdminPagination from "../../../../components/AdminPagination";
import { getOrderProducts } from "../../";
import RenderOrderProducts from "./RenderOrderProducts";
import DetailOrder from "./DetailOrder";

function OrderManagementBody(props) {
  const { admin, warehouses } = props;
  const [orderData, setOrderData] = useState([]);
  const [singleOrder, setSingleOrder] = useState({});
  const [isSingleItemClicked, setSingleItemClicked] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filterState, setFilterState] = useState({
    warehouse: admin.id_warehouse ? admin.id_warehouse : "",
    status: "",
  });
  const OFFSET = 7;
  const LIMIT = 7;

  const fetchingData = async () => {
    const dataInput = {
      offset: OFFSET,
      limit: LIMIT,
      page: pageNum,
      id_warehouse: filterState.warehouse,
      status_order: filterState.status,
    };
    const response = await getOrderProducts(dataInput);
    setOrderData([...response?.result?.dataToSend]);
    setTotalPage(response?.result?.totalPage);
  };

  const isWarehouseFilterDisabled = () => {
    return admin.id_role !== 1;
  };

  const selectFilterOnChange = (e) => {
    const subFilterName = e.target.id.split("-")[0];
    const filterChange = { [subFilterName]: e.target.value };
    setFilterState((prevState) => ({ ...prevState, ...filterChange }));
    setPageNum(1);
  };

  const singleItemHandler = async (singleData) => {
    setSingleItemClicked(true);
    setSingleOrder({ ...singleData });
  };

  useEffect(() => {
    fetchingData();
  }, [filterState, pageNum]);

  return (
    <>
      {isSingleItemClicked ? (
        <DetailOrder
          singleOrder={singleOrder}
          setSingleItemClicked={setSingleItemClicked}
          fetchingData={fetchingData}
        />
      ) : null}
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
