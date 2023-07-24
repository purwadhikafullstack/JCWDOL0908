import React from "react";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";
import ImageRender from "./ImageRender";
import DetailOrderBody from "./DetailOrderBody";
import OrderButton from "./OrderButton";
import { useDetailOrder } from "../../util/useDetailOrder";

function DetailOrder(props) {
  const { singleOrder, setSingleItemClicked, fetchingData } = props;
  const {
    REACT_APP_SERVER_URL,
    productsStock,
    isStockEnough,
    rejectBtnHandler,
    approveBtnHandler,
    createMutationHandler,
    sendOrderHandler,
    cancelBtnHandler,
  } = useDetailOrder(singleOrder, setSingleItemClicked, fetchingData);

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
