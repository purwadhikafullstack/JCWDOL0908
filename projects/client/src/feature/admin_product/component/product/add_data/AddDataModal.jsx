import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CurrencyInput from "./CurrencyInput";
import CustomInput from "../../CustomInput";
import CustomTextArea from "../../CustomTextArea";
import UploadPicture from "../../UploadPicture";
import CustomSelectCategory from "../CustomSelectCategory";
import { getProducts, postProduct } from "../../../";

function AddDataModal(props) {
  const { setNewProductClicked, categories, pageNum, setProducts, OFFSET, LIMIT, selectedCategory, setTotalPate } =
    props;
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
      let price = currencyValue.replace(/[^0-9]/g, "");
      price = parseInt(price);
      const data = { ...values, price };
      const formData = new FormData();
      formData.append("photo", preview);
      formData.append("data", JSON.stringify(data));
      const response = await postProduct(formData);
      alert(response.message);
      const fetchedData = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
      setProducts([...fetchedData.result.productsList]);
      setTotalPate(fetchedData.result.totalPage);
      setNewProductClicked(false);
    },
  });

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setNewProductClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="my-4 font-bold">Create Product</h1>
          <form onSubmit={formik.handleSubmit} className="pt-4 pb-0 text-slate-800 gap-2 flex flex-col">
            <UploadPicture preview={preview} handleImageChange={handleImageChange} alt="product image" />
            <CustomInput type="text" name="product_name" id="product_name" formik={formik} label="product name" />
            <CustomTextArea type="textarea" name="description" id="description" formik={formik} label="description" />
            <CustomInput type="number" name="weight_kg" id="weight_kg" formik={formik} label="weight (kg)" />
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-slate-800 text-xs font-medium my-0 col-span-2">price</label>
              <p>:</p>
              <CurrencyInput
                value={currencyValue}
                onChange={setCurrencyValue}
                name="price"
                id="price"
                formik={formik}
              />
            </div>
            <CustomSelectCategory formik={formik} categories={categories} label="category" name="id_category" />
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button type="submit" onClick={formik.handleSubmit} className="bg-green-800 text-white h-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDataModal;
