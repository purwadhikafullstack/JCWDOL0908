import { useEffect, useState } from "react";
import { getWarehouses } from "../../admin_warehouse";
import { getCategories } from "../../admin_product";
import { getProductJournal } from "../";

export const useProductHistoryBody = (admin) => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [journalData, setJournalData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [singleJournal, setSingleJournal] = useState({});
  const [isSingleItemClicked, setSingleItemClicked] = useState(false);
  const [filterState, setFilterState] = useState({
    warehouse: admin.id_warehouse ? admin.id_warehouse : "",
    month: "",
    year: "",
    category: "",
  });
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const offset = 7;
  const limit = 7;

  useEffect(() => {
    (async () => {
      const response = await getWarehouses("");
      const category = await getCategories("");
      setWarehouses([...response?.result]);
      setCategories([...category?.categories]);
    })();
  }, []);

  const isMonthAndYearFilled = () => {
    return filterState.month && filterState.year;
  };

  const isWarehouseSelected = () => {
    return filterState.warehouse;
  };

  const fetchingJournalData = async () => {
    const currentMonth = selectingDate(filterState.month, filterState.year, 1);
    const lastMonth = selectingDate(filterState.month, filterState.year, 0);
    let dataToSend = {
      currentMonth,
      lastMonth,
      id_warehouse: filterState.warehouse,
      id_category: filterState.category,
      offset,
      limit,
      page: pageNum,
    };
    dataToSend = JSON.stringify(dataToSend);
    const response = await getProductJournal(dataToSend);
    setTotalPage(response?.result?.totalPage);
    setJournalData([...response?.result?.dataToSend]);
  };

  useEffect(() => {
    (async () => {
      if (isMonthAndYearFilled() && isWarehouseSelected()) {
        setPageNum(1);
        await fetchingJournalData();
      }
    })();
  }, [filterState]);

  useEffect(() => {
    (async () => {
      if (isMonthAndYearFilled() && isWarehouseSelected()) {
        await fetchingJournalData();
      }
    })();
  }, [pageNum]);

  const selectingDate = (month, year, n) => {
    const selectedMonth = parseInt(month);
    const selectedYear = parseInt(year);
    let startDate = new Date(selectedYear, selectedMonth + (n - 1), 2);
    startDate.setHours(0, 0, 1, 0);
    let endDate = new Date(selectedYear, selectedMonth + n, 0);
    endDate.setHours(23, 59, 59, 0);
    startDate = startDate.toISOString().split("T")[0] + " 00:00:01";
    endDate = endDate.toISOString().split("T")[0] + " 23:59:59";
    return { startDate, endDate };
  };

  const selectFilterOnChange = (e) => {
    const subFilterName = e.target.id.split("-")[0];
    const filterChange = { [subFilterName]: e.target.value };
    setFilterState((prevState) => ({ ...prevState, ...filterChange }));
  };

  const isWarehouseFilterDisabled = () => {
    return admin.id_role !== 1;
  };

  const singleItemHandler = async (singleJournal) => {
    setSingleItemClicked(true);
    setSingleJournal({ ...singleJournal });
  };

  return {
    pageNum,
    setPageNum,
    totalPage,
    setTotalPage,
    journalData,
    setJournalData,
    categories,
    setCategories,
    warehouses,
    setWarehouses,
    singleJournal,
    setSingleJournal,
    isSingleItemClicked,
    setSingleItemClicked,
    filterState,
    setFilterState,
    months,
    isMonthAndYearFilled,
    isWarehouseSelected,
    fetchingJournalData,
    selectingDate,
    selectFilterOnChange,
    isWarehouseFilterDisabled,
    singleItemHandler,
  };
};
