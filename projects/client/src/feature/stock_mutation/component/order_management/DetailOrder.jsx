import React, { useEffect, useState } from "react";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import ImageRender from "./ImageRender";
import DetailOrderBody from "./DetailOrderBody";
import { getListOfProductsInWarehouse } from "../../../admin_product";
import OrderButton from "./OrderButton";
import { approvePayment, cancelPayment, createAutoMutation, rejectPayment, sendOrder } from "../../";

function DetailOrder(props) {
  const { singleOrder, setSingleItemClicked, fetchingData } = props;
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

  return (
    <div className="modal-background">
      <div className="modal-container w-5/6">
        <ClosedBtnModal setModal={setSingleItemClicked} />
        <div>
          <h1 className="modal-header-text">Detail Order</h1>
          <div className="h-[28rem] overflow-auto pr-4 pl-2 shadow-inner bg-slate-50">
            <div className="text-primary gap-2 flex flex-col ">
              {singleOrder.payment_proof !== null && (
                <ImageRender preview={REACT_APP_SERVER_URL + singleOrder.payment_proof} alt="proof of payment" />
              )}
              <DetailOrderBody singleOrder={singleOrder} productsStock={productsStock} />
              <OrderButton
                singleOrder={singleOrder}
                isStockEnough={isStockEnough}
                rejectBtnHandler={rejectBtnHandler}
                approveBtnHandler={approveBtnHandler}
                cancelBtnHandler={cancelBtnHandler}
                createMutationHandler={createMutationHandler}
                sendOrderHandler={sendOrderHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
