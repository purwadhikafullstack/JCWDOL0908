import React, { useState } from "react";
import RenderWarehouseOption from "../RenderWarehouseOption";
import { deleteStock, getStock } from "../../../";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";

function DeleteModal(props) {
  const { setDeleteClicked, warehouses, userAdmin, productStock, singleProduct, refetchedData } = props;
  const idWarehouse = userAdmin?.id_warehouse;

  const isItWarehouseAdmin = () => {
    return userAdmin?.id_warehouse;
  };

  const initialValues = isItWarehouseAdmin() ? idWarehouse : "";
  const [selectedWarehouses, setWarehouse] = useState(initialValues);
  const [stockQty, setStock] = useState(productStock.stock);

  const onChangeSelect = async (event) => {
    const response = await getStock(singleProduct.id_product, event.target.value);
    setStock(response?.result?.stock);
    setWarehouse(event.target.value);
  };

  const deleteBtnHandler = async () => {
    const response = await deleteStock(singleProduct.id_product, selectedWarehouses);
    if (!response.isSuccess) return setDeleteClicked(false);
    alert(response.message);
    await refetchedData();
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setDeleteClicked} />
        <div className="text-xs md:text-base lg:text-lg">
          <h1 className="mt-4 mb-1 font-bold font-title text-lg md:text-xl lg:text-2xl">Delete Stock </h1>
          <h2 className="text-xs mb-4 md:text-base lg:text-lg">
            <span className="font-bold">product</span> : <i>{singleProduct.product_name}</i>
          </h2>
          <div className="pt-4 pb-0 text-primary gap-2 flex flex-col">
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-primary  font-semibold my-0 col-span-2">Warehouse</label>
              <p className="font-semibold">:</p>
              <select
                onChange={onChangeSelect}
                name="warehouse"
                className="bg-gray-50 border border-gray-300 text-primary
                rounded-none my-1 shadow-primary focus:ring-light focus:border-light block w-full px-2
                placeholder col-span-5 h-fit py-1"
                value={idWarehouse}
                disabled={isItWarehouseAdmin()}
              >
                <option value={""}>Select Warehouse</option>
                <RenderWarehouseOption warehouses={warehouses} />
              </select>
            </div>
          </div>
          <div className="pt-4 pb-0 text-primary gap-2 flex flex-col">
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-primary  font-semibold my-0 col-span-2">Quantity</label>
              <p className="font-semibold">:</p>
              <p className="col-span-5 h-full">{stockQty}</p>
            </div>
          </div>
          <h3 className="text-center mt-8 mb-2">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <div className="grid grid-cols-3 gap-2 h-8 ">
            <button
              disabled={!selectedWarehouses || stockQty === undefined}
              className="bg-red-800 text-white font-semibold h-full col-start-2
              disabled:bg-slate-300 disabled:hover:cursor-not-allowed"
              onClick={deleteBtnHandler}
            >
              Delete Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
