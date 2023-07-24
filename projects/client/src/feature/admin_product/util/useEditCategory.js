import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { editCategory, getCategories } from "../";

export const useEditCategory = (setEditClicked, pageNum, setCategories, singleCategory) => {
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
      const editCategoryBtn = document.getElementById("edit-category-btn");
      editCategoryBtn.disabled = true;
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(values));
      const response = await editCategory(formData, singleCategory.id_category);
      alert(response.message);
      const refetchData = await getCategories(pageNum);
      await setCategories({ ...refetchData });
      editCategoryBtn.disabled = false;
      setEditClicked(false);
    },
  });

  return { preview, handleImageChange, formik };
};
