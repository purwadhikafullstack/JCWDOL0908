import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editCategory, getCategories } from "../../../";
import UploadPicture from "../../UploadPicture";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";

function EditModal(props) {
  const { setEditClicked, pageNum, setCategories, singleCategory } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [preview, setPreview] = useState(`${REACT_APP_SERVER_URL + singleCategory.category_image}`);
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

  const handleImageChange = (event) => {
    const newImg = document.querySelector("#image_preview");
    const selected = event.target.files[0];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setPreview(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        const imgUrl = reader.result;
        newImg.src = imgUrl;
      };
      reader.readAsDataURL(selected);
    }
  };

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().required("required"),
  });

  const formik = useFormik({
    initialValues: {
      category_name: singleCategory.category_name,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(values));
      const response = await editCategory(formData, singleCategory.id_category);
      alert(response.message);
      const refetchData = await getCategories(pageNum);
      await setCategories({ ...refetchData });
      setEditClicked(false);
    },
  });

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
              <button type="submit" onClick={formik.handleSubmit} className="bg-primary text-white h-full">
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
