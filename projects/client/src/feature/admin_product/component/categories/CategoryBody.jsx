import React, { useEffect, useState } from "react";
import AddNewCategory from "./add_category/AddNewCategory";
import { getCategories } from "../../";
import RenderCategories from "./RenderCategories";
import AdminPagination from "../../../../components/AdminPagination";
import DeleteModal from "./delete_category/DeleteModal";
import EditModal from "./edit_category/EditModal";
import { useSelector } from "react-redux";
import CreateButton from "../CreateButton";

function CategoryBody() {
  const [isNewCategoryClicked, setNewCategoryClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [singleCategory, setSingleCategory] = useState({});
  const [categories, setCategories] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const roleAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, [pageNum]);

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
        <AddNewCategory setNewCategoryClicked={setNewCategoryClicked} pageNum={pageNum} setCategories={setCategories} />
      ) : null}
      {isDeleteClicked ? (
        <DeleteModal
          setDeleteClicked={setDeleteClicked}
          pageNum={pageNum}
          singleCategory={singleCategory}
          setCategories={setCategories}
        />
      ) : null}
      <div className="product-and-category-body-container">
        <div className="render-data-container ">
          <RenderCategories
            categories={categories?.categories}
            setSingleCategory={setSingleCategory}
            setDeleteClicked={setDeleteClicked}
            setEditClicked={setEditClicked}
            roleAdmin={roleAdmin}
          />
        </div>
      </div>
      <CreateButton admin={roleAdmin} setFunction={setNewCategoryClicked} text={"Category"} />
      <div className="pagination-container">
        <AdminPagination setPageNum={setPageNum} pageNum={pageNum} totalPage={categories?.totalPage} />
      </div>
    </>
  );
}

export default CategoryBody;
