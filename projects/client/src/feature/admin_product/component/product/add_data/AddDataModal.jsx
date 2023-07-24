import React from "react";
import CurrencyInput from "./CurrencyInput";
import CustomInput from "../../../../../components/CustomInput";
import CustomTextArea from "../../CustomTextArea";
import UploadPicture from "../../UploadPicture";
import CustomSelectFormikHook from "../../../../../components/CustomSelectFormikHook";
import RenderCategoryOptions from "../../RenderCategoryOptions";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useAddProduct } from "../../../util/useAddProduct";

function AddDataModal(props) {
  const { setNewProductClicked, categories, refetchedData } = props;
  const { currencyValue, setCurrencyValue, preview, handleImageChange, formik } = useAddProduct(
    setNewProductClicked,
    refetchedData,
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setNewProductClicked} />
        <div>
          <h1 className="modal-header-text">Create Product</h1>
          <form onSubmit={formik.handleSubmit} className="pt-4 pb-0 text-primary gap-2 flex flex-col">
            <UploadPicture preview={preview} handleImageChange={handleImageChange} alt="product image" />
            <CustomInput type="text" name="product_name" id="product_name" formik={formik} label="product name" />
            <CustomTextArea type="textarea" name="description" id="description" formik={formik} label="description" />
            <CustomInput type="number" name="weight_kg" id="weight_kg" formik={formik} label="weight (kg)" />
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-primary text-xs font-medium my-0 col-span-2">price</label>
              <p>:</p>
              <CurrencyInput
                value={currencyValue}
                onChange={setCurrencyValue}
                name="price"
                id="price"
                formik={formik}
              />
            </div>
            <CustomSelectFormikHook formik={formik} label="category" name="id_category">
              <RenderCategoryOptions categories={categories} />
            </CustomSelectFormikHook>
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button
                id="add-product-btn"
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

export default AddDataModal;
