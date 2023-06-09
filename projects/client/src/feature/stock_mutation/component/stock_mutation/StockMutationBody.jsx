import React, { useEffect, useState } from "react";
import AdminPagination from "../../../../components/AdminPagination";
import RenderBodyData from "../../../../components/RenderBodyData";
import AddModal from "./add_request/AddModal";
import { getWarehouses } from "../../../admin_warehouse";
import SelectFilter from "../../../../components/SelectFilter";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import { getMutationRequests } from "../../";
import RenderMutationData from "../RenderMutationData";
import NoData from "../../../../components/NoData";
import UpdateModal from "./update_mutation/UpdateModal";

function StockMutationBody(props) {
  const { admin } = props;
  const [createNewRequest, setNewRequest] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filterState, setFilterState] = useState({
    id_warehouse: admin.id_warehouse ? admin.id_warehouse : "",
    mutationType: "",
    status: "",
  });
  const [warehouses, SetWarehouses] = useState([]);
  const [mutationList, setMutationList] = useState([]);
  const [singleItemClicked, setSingleItemClicked] = useState(false);
  const [singleData, setSingleData] = useState({});
  const OFFSET = 7;
  const LIMIT = 7;

  useEffect(() => {
    (async () => {
      const response = await getWarehouses("");
      SetWarehouses([...response?.result]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      fetchingData();
    })();
  }, [filterState, pageNum]);

  const fetchingData = async () => {
    const response = await getMutationRequests(OFFSET, LIMIT, pageNum, filterState);
    setMutationList([...response?.result.dataToSend]);
    setTotalPage(response.result.totalPage);
  };

  const warehouseOnChange = async (e) => {
    setFilterState({ ...filterState, id_warehouse: e.target.value });
  };

  const mutationOnChange = async (e) => {
    setFilterState({ ...filterState, mutationType: e.target.value });
  };

  const statusOnChange = async (e) => {
    setFilterState({ ...filterState, status: e.target.value });
  };

  const singleItemClickedHandler = (singleData) => {
    setSingleItemClicked(true);
    setSingleData({ ...singleData });
  };

  const isWarehouseFilterDisabled = () => {
    return admin.id_role !== 1;
  };

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
      <div className="row-span-10 grid grid-rows-9 gap-2 lg:gap-2">
        <RenderBodyData>
          {mutationList.length ? (
            <RenderMutationData dataList={mutationList} singleItemClickedHandler={singleItemClickedHandler} />
          ) : (
            <NoData text="Data" />
          )}
        </RenderBodyData>
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
