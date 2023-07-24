import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories, getProductsStocks } from "../";

export const useManageStockBody = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [productsList, setProductsList] = useState([]);
  const userAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);
  const OFFSET = 9;
  const LIMIT = 9;

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getProductsStocks(OFFSET, LIMIT, pageNum, "", selectedCategories, userAdmin?.id_warehouse);
      setProductsList([...response.result?.productsList]);
      setTotalPage(response.result.totalPage);
    })();
  }, [selectedCategories, pageNum]);

  const inputOnChangeHandler = async (event) => {
    const response = await getProductsStocks(
      OFFSET,
      LIMIT,
      pageNum,
      event.target.value,
      selectedCategories,
      userAdmin?.id_warehouse,
    );
    setProductsList([...response.result.productsList]);
    setTotalPage(response.result.totalPage);
  };

  const filterOnChangeHandle = (event) => {
    setSelectedCategories(event.target.value);
  };

  const refetchedData = async () => {
    const fetchingData = await getProductsStocks(
      OFFSET,
      LIMIT,
      pageNum,
      "",
      selectedCategories,
      userAdmin?.id_warehouse,
    );
    setProductsList([...fetchingData.result.productsList]);
  };

  return {
    categories,
    setCategories,
    selectedCategories,
    setSelectedCategories,
    pageNum,
    setPageNum,
    totalPage,
    setTotalPage,
    productsList,
    setProductsList,
    userAdmin,
    inputOnChangeHandler,
    filterOnChangeHandle,
    refetchedData,
  };
};
