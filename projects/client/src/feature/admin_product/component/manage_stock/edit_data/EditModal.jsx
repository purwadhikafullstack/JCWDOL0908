import React from "react";
import RenderWarehouseOption from "../RenderWarehouseOption";
import SubmitButton from "./SubmitButton";
import AddOrDecrease from "./AddOrDecrease";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import { useEditStock } from "../../../util/useEditStock";

function EditModal(props) {
  const { setEditClicked, warehouses, userAdmin, productStock, singleProduct, refetchedData } = props;
  const {
    selectedWarehouses,
    stockQty,
    onChangeSelect,
    doesStockDataNotExistOnThisWarehouse,
    createStockBtnHandler,
    submitBtnHandler,
    addQty,
    decreaseQty,
    isItWarehouseAdmin,
  } = useEditStock(userAdmin, singleProduct, productStock, refetchedData, setEditClicked);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setEditClicked} />
        <div>
          <h1 className="mt-4 mb-1 font-bold font-title text-lg md:text-xl lg:text-2xl">Update Stock </h1>
          <h2 className="text-xs mb-4 md:text-base lg:text-lg">
            <span className="font-bold">product</span> : <i>{singleProduct.product_name}</i>
          </h2>
          <div className="pt-4 pb-0 text-primary gap-2 flex flex-col">
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-primary text-xs font-semibold my-0 col-span-2">Warehouse</label>
              <p className="font-semibold">:</p>
              <select
                onChange={onChangeSelect}
                name="warehouse"
                id="warehouse"
                className="placeholder:text-xs text-xs bg-gray-50 border border-gray-300 text-primary
                sm:text-xs rounded-none my-1 shadow-primary focus:ring-light focus:border-light block w-full px-2
                placeholder col-span-5 h-fit py-1"
                value={userAdmin?.id_warehouse}
                disabled={isItWarehouseAdmin()}
              >
                <option value={""}>Select Warehouse</option>
                <RenderWarehouseOption warehouses={warehouses} />
              </select>
            </div>
            <AddOrDecrease
              decreaseQty={decreaseQty}
              addQty={addQty}
              stockQty={stockQty}
              selectedWarehouses={selectedWarehouses}
            />
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              {doesStockDataNotExistOnThisWarehouse() ? (
                <SubmitButton
                  selectedWarehouses={selectedWarehouses}
                  submitBtnHandler={createStockBtnHandler}
                  text="Create Stock"
                />
              ) : (
                <SubmitButton
                  selectedWarehouses={selectedWarehouses}
                  submitBtnHandler={submitBtnHandler}
                  text="Submit"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
