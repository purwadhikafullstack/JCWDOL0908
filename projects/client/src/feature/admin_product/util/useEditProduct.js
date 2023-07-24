import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editProduct } from "../";

export const useEditProduct = (singleProduct, setEditClicked, refetchedData, admin) => {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [currencyValue, setCurrencyValue] = useState(
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(singleProduct.price),
  );
  const [preview, setPreview] = useState(`${REACT_APP_SERVER_URL + singleProduct.product_image}`);
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
      product_name: singleProduct.product_name,
      description: singleProduct.description,
      weight_kg: singleProduct.weight_kg,
      id_category: singleProduct.id_category,
    },
    validationSchema,
    onSubmit: async (values) => {
      const editProductBtn = document.getElementById("edit-product-btn");
      editProductBtn.disabled = true;
      let price = currencyValue.replace(/[^0-9]/g, "");
      price = parseInt(price);
      const id_product = singleProduct.id_product;
      const data = { ...values, price };
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(data));
      const editResponse = await editProduct(formData, id_product);
      alert(editResponse.message);
      await refetchedData();
      editProductBtn.disabled = false;
      setEditClicked(false);
    },
  });

  const isItNotSuperAdmin = () => {
    return admin?.role_admin !== "super-admin";
  };

  return {
    currencyValue,
    setCurrencyValue,
    preview,
    handleImageChange,
    formik,
    isItNotSuperAdmin,
  };
};
