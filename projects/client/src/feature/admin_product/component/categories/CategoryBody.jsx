import React, { useEffect, useState } from "react";
import AddNewCategory from "./add_category/AddNewCategory";
import { getCategories } from "../../";
import RenderCategories from "./RenderCategories";
import Pagination from "./Pagination";
import DeleteModal from "./delete_category/DeleteModal";
import EditModal from "./edit_category/EditModal";
import { useSelector } from "react-redux";

function CategoryBody() {
  const [isNewCategoryClicked, setNewCategoryClicked] = useState(false);
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [isEditClicked, setEditClicked] = useState(false);
  const [singleCategory, setSingleCategory] = useState({});
  const [categories, setCategories] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const roleAdmin = useSelector((state) => state.adminLogin.loggedInAdminData);
  console.log(roleAdmin.role_admin);
  console.log(roleAdmin?.role_admin !== "super-admin");

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, [pageNum]);

  useEffect(() => {
    (async () => {
      const response = await getCategories(pageNum);
      await setCategories({ ...response });
    })();
  }, []);

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
      <div className="row-span-6 grid gap-2 lg:gap-2">
        <div
          className="font-semibold text-slate-800 grid grid-rows-4 md:grid-rows-2
          md:grid-cols-2 items-start gap-2 text-2xl lg:text-4xl md:text-3xl lg:gap-6 pt-4"
        >
          <RenderCategories
            categories={categories?.categories}
            setSingleCategory={setSingleCategory}
            setDeleteClicked={setDeleteClicked}
            setEditClicked={setEditClicked}
            roleAdmin={roleAdmin}
          />
        </div>
      </div>
      <div className="row-span-1 flex text-center items-end lg:grid lg:grid-cols-2">
        <button
          onClick={() => setNewCategoryClicked(true)}
          className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold lg:w-1/3 disabled:bg-white disabled:border-2 lg:disabled:border-4
          disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
          disabled={roleAdmin?.role_admin !== "super-admin"}
        >
          <i className="uil uil-plus"></i> New Category
        </button>
      </div>
      <div className="pagination-container">
        <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPage={categories?.totalPage} />
      </div>
    </>
  );
}

export default CategoryBody;
