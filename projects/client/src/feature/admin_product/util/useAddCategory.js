import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCategories, postCategory } from "../";

export const useAddCategory = (setNewCategoryClicked, pageNum, setCategories) => {
  const [preview, setPreview] = useState();
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
      category_name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const addCategoryBtn = document.getElementById("add-category-btn");
      addCategoryBtn.disabled = true;
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(values));
      const response = await postCategory(formData);
      alert(response.message);
      const refetchData = await getCategories(pageNum);
      await setCategories({ ...refetchData });
      addCategoryBtn.disabled = false;
      setNewCategoryClicked(false);
    },
  });

  return {
    preview,
    setPreview,
    handleImageChange,
    formik,
  };
};
