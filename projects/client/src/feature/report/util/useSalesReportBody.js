import { useEffect, useState } from "react";
import { getWarehouses } from "../../admin_warehouse";
import { getTopCategories, getTopProducts, getTotalSales } from "../";

export const useSalesReportBody = (admin) => {
  const [warehouses, setWarehouses] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [topTwoCategories, setTopTwoCategories] = useState([]);
  const [topTwoProducts, setTopTwoProducts] = useState([]);
  const [allTopCategories, setAllCategories] = useState(false);
  const [allTopProducts, setAllProducts] = useState(false);
  const [filterState, setFilterState] = useState({
    warehouse: admin.id_warehouse ? admin.id_warehouse : "",
    month: "",
    year: "",
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

  useEffect(() => {
    (async () => {
      const response = await getWarehouses("");
      setWarehouses([...response?.result]);
    })();
  }, []);

  const fetchData = async () => {
    const id_warehouse = filterState.warehouse;
    if (filterState.year && filterState.month) {
      const currentMonth = selectingDate(filterState.month, filterState.year, 1);
      const totalSales = await getTotalSales({ ...currentMonth, id_warehouse });
      const topCategories = await getTopCategories({ ...currentMonth, id_warehouse, limit: 2 });
      const topProducts = await getTopProducts({ ...currentMonth, id_warehouse, limit: 2 });
      const total = totalSales?.result[0]?.totalTransaction ? totalSales?.result[0]?.totalTransaction : 0;
      setTopTwoCategories([...topCategories.result]);
      setTopTwoProducts([...topProducts.result]);
      setTotalSales(parseInt(total));
    } else if (!(filterState.year && filterState.month)) {
      const totalSales = await getTotalSales({ startDate: "", endDate: "", id_warehouse });
      const topCategories = await getTopCategories({ startDate: "", endDate: "", id_warehouse, limit: 2 });
      const topProducts = await getTopProducts({ startDate: "", endDate: "", id_warehouse, limit: 2 });
      const total = totalSales?.result[0]?.totalTransaction ? totalSales?.result[0]?.totalTransaction : 0;
      setTopTwoCategories([...topCategories.result]);
      setTopTwoProducts([...topProducts.result]);
      setTotalSales(parseInt(total));
    }
  };

  useEffect(() => {
    (async () => {
      fetchData();
    })();
  }, [filterState]);

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

  const currencyFormat = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const isWarehouseFilterDisabled = () => {
    return admin.id_role !== 1;
  };

  const selectFilterOnChange = (e) => {
    const subFilterName = e.target.id.split("-")[0];
    const filterChange = { [subFilterName]: e.target.value };
    setFilterState((prevState) => ({ ...prevState, ...filterChange }));
  };

  return {
    warehouses,
    setWarehouses,
    totalSales,
    setTotalSales,
    topTwoCategories,
    setTopTwoCategories,
    topTwoProducts,
    setTopTwoProducts,
    allTopCategories,
    setAllCategories,
    allTopProducts,
    setAllProducts,
    filterState,
    setFilterState,
    months,
    fetchData,
    selectingDate,
    currencyFormat,
    isWarehouseFilterDisabled,
    selectFilterOnChange,
  };
};
