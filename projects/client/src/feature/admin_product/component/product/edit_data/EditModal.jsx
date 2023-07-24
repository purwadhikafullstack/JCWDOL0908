import React from "react";
import UploadPicture from "../../UploadPicture";
import CustomInput from "../../../../../components/CustomInput";
import CustomTextArea from "../../CustomTextArea";
import CurrencyInput from "../add_data/CurrencyInput";
import CustomSelectFormikHook from "../../../../../components/CustomSelectFormikHook";
import RenderCategoryOptions from "../../RenderCategoryOptions";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useEditProduct } from "../../../util/useEditProduct";

function EditModal(props) {
  const { singleProduct, setEditClicked, categories, refetchedData, admin } = props;

  const { currencyValue, setCurrencyValue, preview, handleImageChange, formik, isItNotSuperAdmin } = useEditProduct(
    singleProduct,
    setEditClicked,
    refetchedData,
    admin,
  );

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setEditClicked} />
        <div>
          <h1 className="modal-header-text">Edit Product</h1>
          <form onSubmit={formik.handleSubmit} className="pt-4 pb-0 text-primary gap-2 flex flex-col">
            <UploadPicture
              preview={preview}
              handleImageChange={handleImageChange}
              alt="product image"
              disabled={isItNotSuperAdmin()}
            />
            <CustomInput
              type="text"
              name="product_name"
              id="product_name"
              formik={formik}
              label="product name"
              isDisabled={isItNotSuperAdmin()}
            />
            <CustomTextArea
              type="textarea"
              name="description"
              id="description"
              formik={formik}
              label="description"
              disabled={isItNotSuperAdmin()}
            />
            <CustomInput
              type="number"
              name="weight_kg"
              id="weight_kg"
              formik={formik}
              label="weight (kg)"
              isDisabled={isItNotSuperAdmin()}
            />
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-primary text-xs font-semibold my-0 col-span-2">price</label>
              <p className="font-semibold">:</p>
              <CurrencyInput
                value={currencyValue}
                onChange={setCurrencyValue}
                name="price"
                id="price"
                formik={formik}
                disabled={isItNotSuperAdmin()}
              />
            </div>
            <CustomSelectFormikHook
              formik={formik}
              categories={categories}
              label="category"
              name="id_category"
              isDisabled={isItNotSuperAdmin()}
            >
              <RenderCategoryOptions categories={categories} />
            </CustomSelectFormikHook>
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button
                id="edit-product-btn"
                type="submit"
                onClick={formik.handleSubmit}
                className="bg-primary text-white h-full disabled:cursor-not-allowed
                disabled:bg-slate-100 disabled:text-primaryLight"
                disabled={isItNotSuperAdmin()}
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
