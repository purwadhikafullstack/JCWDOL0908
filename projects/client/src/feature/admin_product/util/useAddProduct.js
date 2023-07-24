import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postProduct } from "../";

export const useAddProduct = (setNewProductClicked, refetchedData) => {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [preview, setPreview] = useState();
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().min(3).max(45).required("required"),
    description: Yup.string().max(255),
    weight_kg: Yup.number().required("required"),
    id_category: Yup.number().required("required"),
  });

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

  const formik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      weight_kg: 0,
      id_category: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const addProductBtn = document.getElementById("add-product-btn");
      addProductBtn.disabled = true;
      let price = currencyValue.replace(/[^0-9]/g, "");
      price = parseInt(price);
      const data = { ...values, price };
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(data));
      const response = await postProduct(formData);
      alert(response.message);
      await refetchedData();
      addProductBtn.disabled = false;
      setNewProductClicked(false);
    },
  });

  return {
    currencyValue,
    setCurrencyValue,
    preview,
    setPreview,
    handleImageChange,
    formik,
  };
};
