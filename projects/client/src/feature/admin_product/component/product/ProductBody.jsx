import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import Filter from "../Filter";
import AddDataModal from "./add_data/AddDataModal";
import { getCategories, getProducts } from "../../";
import RenderProducts from "./RenderProducts";
import { useSelector } from "react-redux";
import DeleteModal from "./delete_data/DeleteModal";
import EditModal from "./edit_data/EditModal";
import NoData from "./NoData";
import { useNavigate } from "react-router-dom";

function ProductBody(props) {
  const { admin } = props;
  const [totalPage, setTotalPate] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [isNewProductClicked, setNewProductClicked] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [singleProduct, setSingleProduct] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const roleAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);
  const OFFSET = 4;
  const LIMIT = 4;

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories([...response.categories]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
      setProducts([...response.result.productsList]);
      setTotalPate(response.result.totalPage);
    })();
  }, [pageNum]);

  useEffect(() => {
    (async () => {
      const response = await getProducts(OFFSET, LIMIT, 1, selectedCategory);
      setProducts([...response.result.productsList]);
      setTotalPate(response.result.totalPage);
      setPageNum(1);
    })();
  }, [selectedCategory]);

  const filterOnChangeHandle = async (event) => {
    const id_category = parseInt(event.target.value);
    setSelectedCategory(id_category);
  };

  return (
    <>
      {isNewProductClicked ? (
        <AddDataModal
          setNewProductClicked={setNewProductClicked}
          categories={categories}
          pageNum={pageNum}
          setProducts={setProducts}
          OFFSET={OFFSET}
          LIMIT={LIMIT}
          selectedCategory={selectedCategory}
          setTotalPate={setTotalPate}
        />
      ) : null}
      {isEditClicked ? (
        <EditModal
          singleProduct={singleProduct}
          setEditClicked={setEditClicked}
          pageNum={pageNum}
          setProducts={setProducts}
          OFFSET={OFFSET}
          LIMIT={LIMIT}
          selectedCategory={selectedCategory}
          setTotalPate={setTotalPate}
          categories={categories}
        />
      ) : null}
      {isDeleteClicked ? (
        <DeleteModal
          setDeleteClicked={setDeleteClicked}
          singleProduct={singleProduct}
          pageNum={pageNum}
          setProducts={setProducts}
          OFFSET={OFFSET}
          LIMIT={LIMIT}
          selectedCategory={selectedCategory}
          setTotalPate={setTotalPate}
        />
      ) : null}
      <div className="product-and-category-body-container grid grid-rows-10">
        <div className="row-span-1 flex items-end text-sm">
          <Filter categories={categories} filterOnChangeHandle={filterOnChangeHandle} />
        </div>
        <div className=" row-span-9 render-data-container">
          {products.length > 0 ? (
            <RenderProducts
              products={products}
              roleAdmin={roleAdmin}
              setDeleteClicked={setDeleteClicked}
              setSingleProduct={setSingleProduct}
              setEditClicked={setEditClicked}
            />
          ) : (
            <NoData />
          )}
        </div>
      </div>
      <div className="row-span-1 flex gap-4 justify-between text-center items-end ">
        <button
          onClick={() => setNewProductClicked(true)}
          className="bg-slate-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/5 disabled:bg-white disabled:border-[3px] 
          disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
          disabled={admin?.role_admin !== "super-admin"}
        >
          <i className="uil uil-plus"></i> New Product
        </button>
        <button
          onClick={() => navigate("/admin/dashboard/product-management/stock")}
          className="bg-white text-slate-800 px-2 py-1 text-base border-2 border-slate-800
          hover:bg-slate-800 hover:text-white font-semibold lg:w-1/5 
          disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          Manage Stock
        </button>
      </div>
      <div className="pagination-container">
        <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPage={totalPage} />
      </div>
    </>
  );
}

export default ProductBody;
