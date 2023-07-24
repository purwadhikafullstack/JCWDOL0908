import React from "react";
import AddNewCategory from "./add_category/AddNewCategory";
import RenderCategories from "./RenderCategories";
import AdminPagination from "../../../../components/AdminPagination";
import DeleteModal from "./delete_category/DeleteModal";
import EditModal from "./edit_category/EditModal";
import CreateButton from "../CreateButton";
import { useCategoryBody } from "../../util/useCategoryBody";
import NoData from "../../../../components/NoData";

function CategoryBody({ admin }) {
  const {
    isNewCategoryClicked,
    setNewCategoryClicked,
    isDeleteClicked,
    setDeleteClicked,
    isEditClicked,
    setEditClicked,
    singleCategory,
    setSingleCategory,
    categories,
    setCategories,
    pageNum,
    setPageNum,
  } = useCategoryBody();

  const CategoryManagementModals = () => {
    return (
      <>
        {isEditClicked ? (
          <EditModal
            setEditClicked={setEditClicked}
            pageNum={pageNum}
            setCategories={setCategories}
            singleCategory={singleCategory}
          />
        ) : null}
        {isNewCategoryClicked ? (
          <AddNewCategory
            setNewCategoryClicked={setNewCategoryClicked}
            pageNum={pageNum}
            setCategories={setCategories}
          />
        ) : null}
        {isDeleteClicked ? (
          <DeleteModal
            setDeleteClicked={setDeleteClicked}
            pageNum={pageNum}
            singleCategory={singleCategory}
            setCategories={setCategories}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      <CategoryManagementModals />
      <div className="product-and-category-body-container">
        <div className="render-data-container ">
          {categories?.categories?.length > 0 ? (
            <RenderCategories
              categories={categories?.categories}
              setSingleCategory={setSingleCategory}
              setDeleteClicked={setDeleteClicked}
              setEditClicked={setEditClicked}
              roleAdmin={admin}
            />
          ) : (
            <NoData text="data" />
          )}
        </div>
      </div>
      <CreateButton admin={admin} setFunction={setNewCategoryClicked} text={"Category"} />
      <div className="pagination-container">
        <AdminPagination setPageNum={setPageNum} pageNum={pageNum} totalPage={categories?.totalPage} />
      </div>
    </>
  );
}

export default CategoryBody;
