import React, { useState } from "react";
import RenderWarehouseOption from "../RenderWarehouseOption";
import { createNewStock, getProductsStocks, getStock, updateStock } from "../../../";

function EditModal(props) {
  const {
    setEditClicked,
    warehouses,
    userAdmin,
    productStock,
    singleProduct,
    OFFSET,
    LIMIT,
    pageNum,
    selectedCategories,
    setProductsList,
  } = props;
  const initialValues = userAdmin?.id_warehouse ? userAdmin?.id_warehouse : "";
  const [selectedWarehouses, setWarehouse] = useState(initialValues);
  const [stockQty, setStock] = useState(productStock.stock);

  const onChangeSelect = async (event) => {
    const response = await getStock(singleProduct.id_product, event.target.value);
    setStock(response?.result?.stock);
    setWarehouse(event.target.value);
  };

  const createStockBtnHandler = async () => {
    const response = await createNewStock(singleProduct.id_product, selectedWarehouses);
    if (!response.isSuccess) return;
    alert(response.message);
    const fetchedData = await getStock(singleProduct.id_product, selectedWarehouses);
    setStock(fetchedData?.result?.stock);
    console.log("stock", response?.result?.stock);
    setWarehouse(selectedWarehouses);
  };

  const submitBtnHandler = async () => {
    const response = await updateStock(singleProduct.id_product, selectedWarehouses, stockQty);
    if (!response.isSuccess) return setEditClicked(false);
    alert(response.message);
    const fetchingData = await getProductsStocks(
      OFFSET,
      LIMIT,
      pageNum,
      "",
      selectedCategories,
      userAdmin?.id_warehouse,
    );
    setProductsList([...fetchingData.result.productsList]);
    setEditClicked(false);
  };

  const addQty = () => {
    setStock((stockQty) => stockQty + 1);
  };

  const decreaseQty = () => {
    setStock((stockQty) => stockQty - 1);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => setEditClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1 className="mt-4 mb-1 font-bold font-title text-lg md:text-xl lg:text-2xl">Update Stock </h1>
          <h2 className="text-xs mb-4 md:text-base lg:text-lg">
            <span className="font-bold">product</span> : <i>{singleProduct.product_name}</i>
          </h2>
          <div className="pt-4 pb-0 text-slate-800 gap-2 flex flex-col">
            <div className="relative grid grid-cols-8 gap-2 items-center">
              <label className="text-left text-slate-800 text-xs font-semibold my-0 col-span-2">Warehouse</label>
              <p className="font-semibold">:</p>
              <select
                onChange={onChangeSelect}
                name="warehouse"
                id="warehouse"
                className="placeholder:text-xs text-xs bg-gray-50 border border-gray-300 text-slate-800
                sm:text-xs rounded-none my-1 shadow-slate-800 focus:ring-light focus:border-light block w-full px-2
                placeholder col-span-5 h-fit py-1"
                value={userAdmin?.id_warehouse}
                disabled={userAdmin?.id_warehouse}
              >
                <option value={""}>Select Warehouse</option>
                <RenderWarehouseOption warehouses={warehouses} />
              </select>
            </div>
            <div className="relative grid grid-cols-8 gap-2 items-center font-bold">
              <label className="text-left text-slate-800 text-xs font-semibold my-0 col-span-2">Quantity</label>
              <p className="font-semibold">:</p>
              <div className="col-span-5 p-1 border-2 border-slate-200 grid grid-cols-3 md:col-span-2 items-center">
                <button
                  onClick={decreaseQty}
                  className="text-red-800 hover:bg-red-800 hover:text-white text-center
                   disabled:text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
                  disabled={stockQty === 0 || !selectedWarehouses || stockQty === undefined}
                >
                  -
                </button>
                <p className={`text-center text-sm md:text-lg ${selectedWarehouses === "" ? "text-slate-400" : ""}`}>
                  {stockQty}
                </p>
                <button
                  onClick={addQty}
                  disabled={!selectedWarehouses || stockQty === undefined}
                  className="text-green-800 hover:bg-slate-800 hover:text-white text-center
                   disabled:text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm h-8 mt-4">
              {stockQty === undefined && selectedWarehouses ? (
                <button
                  disabled={!selectedWarehouses}
                  className="bg-slate-800 text-white h-full disabled:bg-slate-300 disabled:hover:cursor-not-allowed"
                  onClick={createStockBtnHandler}
                >
                  Create Stock
                </button>
              ) : (
                <button
                  disabled={!selectedWarehouses}
                  className="bg-slate-800 text-white h-full disabled:bg-slate-300 disabled:hover:cursor-not-allowed"
                  onClick={submitBtnHandler}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
