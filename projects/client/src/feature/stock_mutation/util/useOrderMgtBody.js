import { useEffect, useState } from "react";
import { getOrderProducts } from "../";

export const useOrderMgtBody = (admin) => {
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

  return {
    orderData,
    setOrderData,
    singleOrder,
    setSingleOrder,
    isSingleItemClicked,
    setSingleItemClicked,
    pageNum,
    setPageNum,
    totalPage,
    setTotalPage,
    filterState,
    setFilterState,
    fetchingData,
    isWarehouseFilterDisabled,
    selectFilterOnChange,
    singleItemHandler,
  };
};
