import React from "react";
import CustomInput from "../../../../../components/CustomInput";
import CustomSelectFormikHook from "../../../../../components/CustomSelectFormikHook";
import RenderCategoryOptions from "../../../../admin_product/component/RenderCategoryOptions";
import RenderProductsOption from "./RenderProductsOption";
import RenderWarehouse from "../../../../admin/component/all_admin/edit_data/RenderWarehouse";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import AddOrDecrease from "./AddorDecrease";
import MaxQty from "./MaxQty";
import { useAddStockMutation } from "../../../util/useAddStockMutation";

function AddModal(props) {
  const { setNewRequest, admin, warehouse, fetchingData } = props;
  const {
    categories,
    products,
    fromWarehouse,
    quantity,
    maxQty,
    addQty,
    decreaseQty,
    formik,
    categoriesChange,
    productsChange,
    fromWarehouseChange,
  } = useAddStockMutation(setNewRequest, admin, fetchingData);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setNewRequest} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Product Mutation Request</h1>
          <form className="modal-body-container gap-2" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="created_by"
              id="created_by"
              formik={formik}
              label="created by"
              isDisabled={true}
            />
            <CustomSelectFormikHook
              formik={formik}
              label="to-warehouse"
              name="to_id_warehouse"
              isDisabled={admin?.id_warehouse}
            >
              <RenderWarehouse warehouses={warehouse} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="category"
              name="id_category"
              additionalFunction={categoriesChange}
            >
              <RenderCategoryOptions categories={categories} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="product"
              name="id_product"
              additionalFunction={productsChange}
            >
              <RenderProductsOption products={products} />
            </CustomSelectFormikHook>
            <CustomSelectFormikHook
              formik={formik}
              label="from-warehouse"
              name="from_id_warehouse"
              additionalFunction={fromWarehouseChange}
            >
              <RenderWarehouse warehouses={fromWarehouse} />
            </CustomSelectFormikHook>
            <MaxQty maxQty={maxQty} />
            <AddOrDecrease addQty={addQty} decreaseQty={decreaseQty} qty={quantity} maxQty={maxQty} />
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              <button
                disabled={formik.values.from_id_warehouse === ""}
                type="submit"
                onClick={formik.handleSubmit}
                className="bg-primary text-white h-full disabled:cursor-not-allowed disabled:bg-slate-100
                disabled:text-primaryLight"
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

export default AddModal;
