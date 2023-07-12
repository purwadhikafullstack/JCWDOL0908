import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import HeaderStock from "../feature/admin_product/component/manage_stock/HeaderStock";
import BodyStock from "../feature/admin_product/component/manage_stock/BodyStock";
import { getCategories, getProductsStocks } from "../feature/admin_product";
import { useSelector } from "react-redux";

function ManageStock() {
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

  return (
    <LayoutAdmin>
      <div className="page-layout ">
        <HeaderStock
          categories={categories}
          inputOnChangeHandler={inputOnChangeHandler}
          filterOnChangeHandle={filterOnChangeHandle}
        />
        <BodyStock
          productsList={productsList}
          totalPage={totalPage}
          setPageNum={setPageNum}
          pageNum={pageNum}
          userAdmin={userAdmin}
          refetchedData={refetchedData}
        />
      </div>
    </LayoutAdmin>
  );
}

export default ManageStock;
