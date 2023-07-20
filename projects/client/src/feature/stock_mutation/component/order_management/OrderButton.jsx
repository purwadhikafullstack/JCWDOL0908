import React from "react";
import CancelButton from "./CancelButton";
import ProceedButton from "./ProceedButton";

function OrderButton(props) {
  const {
    singleOrder,
    isStockEnough,
    rejectBtnHandler,
    approveBtnHandler,
    cancelBtnHandler,
    createMutationHandler,
    sendOrderHandler,
  } = props;
  const { status_order } = singleOrder;

  const WaitingForPaymentButton = () => {
    return (
      <>
        <CancelButton onClickFunction={cancelBtnHandler} />
      </>
    );
  };

  const PaymentConfirmationButton = () => {
    return (
      <>
        <ProceedButton text="reject" onClickFunction={rejectBtnHandler} />
        <ProceedButton text="approve" onClickFunction={approveBtnHandler} />
      </>
    );
  };

  const NotEnoughStockButton = () => {
    return (
      <>
        <CancelButton onClickFunction={cancelBtnHandler} />
        <ProceedButton text="create-mutation" onClickFunction={createMutationHandler} />
      </>
    );
  };

  const EnoughStockButton = () => {
    return (
      <>
        <CancelButton onClickFunction={cancelBtnHandler} />
        <ProceedButton text="send" onClickFunction={sendOrderHandler} />
      </>
    );
  };

  return (
    <div className="flex gap-6 mb-2 text-sm md:text-base">
      {(status_order === "waiting-for-payment" || status_order === "rejected") && <WaitingForPaymentButton />}
      {status_order === "payment-confirmation" && <PaymentConfirmationButton />}
      {status_order === "on-process" && <>{isStockEnough ? <EnoughStockButton /> : <NotEnoughStockButton />}</>}
    </div>
  );
}

export default OrderButton;
