import { useEffect, useState } from "react";
import { getMutationRequests } from "../";

export const useStockMutationBody = (admin) => {
  const [createNewRequest, setNewRequest] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filterState, setFilterState] = useState({
    id_warehouse: admin.id_warehouse ? admin.id_warehouse : "",
    mutationType: "",
    status: "",
  });
  const [mutationList, setMutationList] = useState([]);
  const [singleItemClicked, setSingleItemClicked] = useState(false);
  const [singleData, setSingleData] = useState({});
  const OFFSET = 7;
  const LIMIT = 7;

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
    setFilterState((prevState) => ({ ...prevState, id_warehouse: e.target.value }));
  };

  const mutationOnChange = async (e) => {
    setFilterState((prevState) => ({ ...prevState, mutationType: e.target.value }));
  };

  const statusOnChange = async (e) => {
    setFilterState((prevState) => ({ ...prevState, status: e.target.value }));
  };

  const singleItemClickedHandler = (singleData) => {
    setSingleItemClicked(true);
    setSingleData({ ...singleData });
  };

  const isWarehouseFilterDisabled = () => {
    return admin.id_role !== 1;
  };

  return {
    createNewRequest,
    setNewRequest,
    pageNum,
    setPageNum,
    totalPage,
    setTotalPage,
    filterState,
    setFilterState,
    mutationList,
    setMutationList,
    singleItemClicked,
    setSingleItemClicked,
    singleData,
    setSingleData,
    warehouseOnChange,
    mutationOnChange,
    statusOnChange,
    singleItemClickedHandler,
    isWarehouseFilterDisabled,
    fetchingData,
  };
};
