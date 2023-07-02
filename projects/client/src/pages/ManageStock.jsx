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
      setProductsList([...response.result.productsList]);
      setTotalPage(response.result.totalPage);
    })();
  }, [selectedCategories]);

  return (
    <LayoutAdmin>
      <div className="grid grid-rows-8 maxvh pt-2 pb-6 px-8 gap-4 ">
        <HeaderStock
          categories={categories}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
          pageNum={pageNum}
          OFFSET={OFFSET}
          LIMIT={LIMIT}
          userAdmin={userAdmin}
          setProductsList={setProductsList}
          setTotalPage={setTotalPage}
        />
        <BodyStock
          productsList={productsList}
          totalPage={totalPage}
          setPageNum={setPageNum}
          pageNum={pageNum}
          userAdmin={userAdmin}
          OFFSET={OFFSET}
          LIMIT={LIMIT}
          selectedCategories={selectedCategories}
          setProductsList={setProductsList}
        />
      </div>
    </LayoutAdmin>
  );
}

export default ManageStock;
