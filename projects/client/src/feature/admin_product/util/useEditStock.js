import { useState } from "react";
import { createNewStock, getStock, updateStock } from "../";

export const useEditStock = (userAdmin, singleProduct, productStock, refetchedData, setEditClicked) => {
  const isItWarehouseAdmin = () => {
    return userAdmin?.id_warehouse;
  };

  const idWarehouse = userAdmin?.id_warehouse;

  const initialValues = isItWarehouseAdmin() ? idWarehouse : "";
  const [selectedWarehouses, setWarehouse] = useState(initialValues);
  const [stockQty, setStock] = useState(productStock.stock);

  const onChangeSelect = async (event) => {
    const response = await getStock(singleProduct.id_product, event.target.value);
    setStock(response?.result?.stock);
    setWarehouse(event.target.value);
  };

  const doesStockDataNotExistOnThisWarehouse = () => {
    return stockQty === undefined && selectedWarehouses;
  };

  const createStockBtnHandler = async () => {
    const response = await createNewStock(singleProduct.id_product, selectedWarehouses);
    if (!response.isSuccess) return;
    alert(response.message);
    const fetchedData = await getStock(singleProduct.id_product, selectedWarehouses);
    setStock(fetchedData?.result?.stock);
    setWarehouse(selectedWarehouses);
  };

  const submitBtnHandler = async () => {
    const editBtnStock = document.getElementById("edit-stock-btn");
    editBtnStock.disabled = true;
    const response = await updateStock(singleProduct.id_product, selectedWarehouses, stockQty);
    if (!response.isSuccess) return setEditClicked(false);
    alert(response.message);
    await refetchedData();
    editBtnStock.disabled = false;
    setEditClicked(false);
  };

  const addQty = () => {
    setStock((stockQty) => stockQty + 1);
  };

  const decreaseQty = () => {
    setStock((stockQty) => stockQty - 1);
  };

  return {
    selectedWarehouses,
    setWarehouse,
    initialValues,
    stockQty,
    setStock,
    onChangeSelect,
    doesStockDataNotExistOnThisWarehouse,
    createStockBtnHandler,
    submitBtnHandler,
    addQty,
    decreaseQty,
    isItWarehouseAdmin,
  };
};
