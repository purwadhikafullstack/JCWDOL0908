import React from "react";
import AdminPagination from "../../../../components/AdminPagination";
import Filter from "../Filter";
import AddDataModal from "./add_data/AddDataModal";
import RenderProducts from "./RenderProducts";
import DeleteModal from "./delete_data/DeleteModal";
import EditModal from "./edit_data/EditModal";
import NoData from "../../../../components/NoData";
import { useProductBody } from "../../util/useProductBody";

function ProductBody(props) {
  const { admin } = props;
  const {
    totalPage,
    pageNum,
    setPageNum,
    isNewProductClicked,
    setNewProductClicked,
    isEditClicked,
    setEditClicked,
    isDeleteClicked,
    setDeleteClicked,
    categories,
    singleProduct,
    setSingleProduct,
    products,
    navigate,
    isItNotSuperAdmin,
    filterOnChangeHandle,
    refetchedData,
  } = useProductBody(admin);

  const ProductManagementModals = () => {
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
            admin={admin}
          />
        ) : null}
        {isDeleteClicked ? (
          <DeleteModal
            setDeleteClicked={setDeleteClicked}
            singleProduct={singleProduct}
            refetchedData={refetchedData}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      <ProductManagementModals />
      <div className="product-and-category-body-container grid grid-rows-10">
        <div className="row-span-1 flex items-end text-sm">
          <Filter categories={categories} filterOnChangeHandle={filterOnChangeHandle} />
        </div>
        <div className=" row-span-9 render-data-container">
          {products.length > 0 ? (
            <RenderProducts
              products={products}
              roleAdmin={admin}
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
          <i className="uil uil-plus"></i> Product
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
