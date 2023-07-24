import { useEffect, useState } from "react";
import { getListOfProductsInWarehouse } from "../../admin_product";
import { approvePayment, cancelPayment, createAutoMutation, rejectPayment, sendOrder } from "../";

export const useDetailOrder = (singleOrder, setSingleItemClicked, fetchingData) => {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [productsStock, setProductsStock] = useState([]);
  const [isStockEnough, setIsStockEnough] = useState(true);

  useEffect(() => {
    (async () => {
      let listOfProduct = singleOrder.transaction_product_rlts.map((data) => {
        return data.id_product;
      });
      listOfProduct = JSON.stringify(listOfProduct);
      const response = await getListOfProductsInWarehouse(listOfProduct, singleOrder.id_warehouse);
      setProductsStock([...response?.result]);
    })();
  }, []);

  const checkStockAndOrderQty = () => {
    const products = [...singleOrder.transaction_product_rlts].sort((a, b) => a.id_product - b.id_product);
    products.forEach((product, index) => {
      if (productsStock[index]?.stock < product.quantity) {
        setIsStockEnough(false);
      }
    });
  };

  const rejectBtnHandler = async () => {
    const rejectBtn = document.getElementById("reject-order");
    const approveBtn = document.getElementById("approve-order");
    rejectBtn.disabled = true;
    approveBtn.disabled = true;
    const response = await rejectPayment(singleOrder.id_transaction);
    alert(response.message);
    await fetchingData();
    rejectBtn.disabled = false;
    approveBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const approveBtnHandler = async () => {
    const rejectBtn = document.getElementById("reject-order");
    const approveBtn = document.getElementById("approve-order");
    rejectBtn.disabled = true;
    approveBtn.disabled = true;
    const response = await approvePayment(singleOrder.id_transaction);
    alert(response.message);
    await fetchingData();
    rejectBtn.disabled = false;
    approveBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const createMutationHandler = async () => {
    const cancelBtn = document.getElementById("cancel-order");
    const createMutationBtn = document.getElementById("create-mutation-order");
    cancelBtn.disabled = true;
    createMutationBtn.disabled = true;
    const response = await createAutoMutation(singleOrder.id_transaction);
    alert(response.message);
    await fetchingData();
    cancelBtn.disabled = false;
    createMutationBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const sendOrderHandler = async () => {
    const cancelBtn = document.getElementById("cancel-order");
    const sendOrderBtn = document.getElementById("send-order");
    cancelBtn.disabled = true;
    sendOrderBtn.disabled = true;
    const response = await sendOrder(singleOrder.id_transaction);
    alert(response.message);
    await fetchingData();
    cancelBtn.disabled = false;
    sendOrderBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const cancelBtnHandler = async () => {
    let createMutationBtn;
    let sendBtn;
    const cancelBtn = document.getElementById("cancel-order");
    cancelBtn.disabled = true;
    if (singleOrder.status_order === "on-process" && !isStockEnough) {
      createMutationBtn = document.getElementById("create-mutation-order");
      createMutationBtn.disabled = true;
    }
    if (singleOrder.status_order === "on-process" && isStockEnough) {
      sendBtn = document.getElementById("send-order");
      sendBtn.disabled = true;
    }
    const response = await cancelPayment(singleOrder.id_transaction);
    alert(response.message);
    await fetchingData();
    if (singleOrder.status_order === "on-process" && !isStockEnough) {
      createMutationBtn.disabled = false;
    }
    if (singleOrder.status_order === "on-process" && isStockEnough) {
      sendBtn.disabled = false;
    }
    setSingleItemClicked(false);
  };

  useEffect(() => {
    checkStockAndOrderQty();
  }, [productsStock]);

  return {
    REACT_APP_SERVER_URL,
    productsStock,
    setProductsStock,
    isStockEnough,
    setIsStockEnough,
    checkStockAndOrderQty,
    rejectBtnHandler,
    approveBtnHandler,
    createMutationHandler,
    sendOrderHandler,
    cancelBtnHandler,
  };
};
