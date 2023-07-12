import React, { useEffect, useState } from "react";
import AdminPagination from "../../../../components/AdminPagination";
import Filter from "../Filter";
import AddDataModal from "./add_data/AddDataModal";
import { getCategories, getProducts } from "../../";
import RenderProducts from "./RenderProducts";
import { useSelector } from "react-redux";
import DeleteModal from "./delete_data/DeleteModal";
import EditModal from "./edit_data/EditModal";
import { useNavigate } from "react-router-dom";
import NoData from "../../../../components/NoData";

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

  const refetchedData = async () => {
    const fetchedData = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
    setProducts([...fetchedData.result.productsList]);
    setTotalPate(fetchedData.result.totalPage);
  };

  const isItNotSuperAdmin = () => {
    return admin?.role_admin !== "super-admin";
  };

  return (
    <>
      {isNewProductClicked ? (
        <AddDataModal
          setNewProductClicked={setNewProductClicked}
          categories={categories}
          refetchedData={refetchedData}
        />
      ) : null}
      {isEditClicked ? (
        <EditModal
          singleProduct={singleProduct}
          setEditClicked={setEditClicked}
          categories={categories}
          refetchedData={refetchedData}
        />
      ) : null}
      {isDeleteClicked ? (
        <DeleteModal setDeleteClicked={setDeleteClicked} singleProduct={singleProduct} refetchedData={refetchedData} />
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
            <NoData text="Product" />
          )}
        </div>
      </div>
      <div className="row-span-1 flex gap-4 justify-between text-center items-end ">
        <button
          onClick={() => setNewProductClicked(true)}
          className="bg-primary text-white px-2 py-1 text-base 
          font-semibold lg:w-1/5 disabled:bg-white disabled:border-[3px] 
          disabled:border-primaryLight disabled:cursor-not-allowed disabled:text-slate-300"
          disabled={isItNotSuperAdmin()}
        >
          <i className="uil uil-plus"></i> New Product
        </button>
        <button
          onClick={() => navigate("/admin/dashboard/product-management/stock")}
          className="bg-white text-primary px-2 py-1 text-base border-2 border-primary
          hover:bg-primary hover:text-white font-semibold lg:w-1/5 
          disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-primaryLight disabled:cursor-not-allowed disabled:text-slate-300"
        >
          Manage Stock
        </button>
      </div>
      <div className="pagination-container">
        <AdminPagination setPageNum={setPageNum} pageNum={pageNum} totalPage={totalPage} />
      </div>
    </>
  );
}

export default ProductBody;
