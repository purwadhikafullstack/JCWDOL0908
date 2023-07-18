import React, { useEffect, useState } from "react";
import SelectFilter from "../../../../components/SelectFilter";
import { getWarehouses } from "../../../admin_warehouse";
import RenderWarehouse from "../../../admin/component/all_admin/edit_data/RenderWarehouse";
import AdminPagination from "../../../../components/AdminPagination";
import RenderBodyData from "./RenderBodyData";
import NoData from "../../../../components/NoData";
import RenderCategoryOptions from "../../../admin_product/component/RenderCategoryOptions";
import { getCategories } from "../../../admin_product";
import { getProductJournal } from "../../";
import RenderJournal from "./RenderJournal";
import DetailJournal from "./DetailJournal";

function ProductHistoryBody(props) {
  const { admin } = props;
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

  const RenderMonths = () => {
    return months.map((month, index) => {
      return (
        <option key={index} value={index}>
          {month}
        </option>
      );
    });
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
