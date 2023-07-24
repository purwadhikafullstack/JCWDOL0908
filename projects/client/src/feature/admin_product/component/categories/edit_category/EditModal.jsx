import React from "react";
import UploadPicture from "../../UploadPicture";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useEditCategory } from "../../../util/useEditCategory";

function EditModal(props) {
  const { setEditClicked, pageNum, setCategories, singleCategory } = props;
  const { preview, handleImageChange, formik } = useEditCategory(
    setEditClicked,
    pageNum,
    setCategories,
    singleCategory,
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setEditClicked} />
        <div>
          <h1 className="modal-header-text">Edit Category</h1>
          <form onSubmit={formik.handleSubmit} htmlFor="image" className="flex flex-col gap-4">
            <UploadPicture preview={preview} handleImageChange={handleImageChange} alt="category image" />
            <div className="grid grid-cols-3 items-center gap-2">
              <label className="col-span-1">category : </label>
              <input
                type="text"
                id="category_name"
                name="category_name"
                className=" placeholder:text-xs text-xs bg-gray-50 border border-slate-200 text-primary
                 sm:text-xs rounded-none my-1 shadow-primary
                 focus:ring-light focus:border-light block w-full px-2
                 placeholder col-span-2 py-2"
                onChange={formik.handleChange}
                value={formik.values.category_name}
              />
              {formik.touched.category_name && formik.errors.category_name ? (
                <div className="text-red-500">{formik.errors.category_name}</div>
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm h-8">
              <button
                id="edit-category-btn"
                type="submit"
                onClick={formik.handleSubmit}
                className="bg-primary text-white h-full btn-disabled"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
