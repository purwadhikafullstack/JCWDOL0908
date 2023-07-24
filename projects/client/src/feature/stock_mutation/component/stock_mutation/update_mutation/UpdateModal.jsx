import React from "react";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import FieldDataRender from "./FieldDataRender";
import RequestedAction from "./RequestedAction";
import RequesterAction from "./RequesterAction";
import { useUpdateMutation } from "../../../util/useUpdateMutation";

function UpdateModal(props) {
  const { setSingleItemClicked, admin, singleData, fetchingData } = props;

  const { acceptBtnHandler, rejectBtnHandler, approveBtnHandler, dateFormatting, statusMutation } = useUpdateMutation(
    setSingleItemClicked,
    admin,
    singleData,
    fetchingData,
  );

  const LastUpdatedBy = () => {
    if (singleData.is_accepted) {
      return <FieldDataRender textLabel="shipped at" value={dateFormatting(singleData.updatedAt)} />;
    } else if (singleData.is_reject) {
      return <FieldDataRender textLabel="rejected at" value={dateFormatting(singleData.updatedAt)} />;
    } else if (singleData.is_approve) {
      return <FieldDataRender textLabel="approved and sent at" value={dateFormatting(singleData.updatedAt)} />;
    } else return <></>;
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setSingleItemClicked} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Detail Requests</h1>
          <div className="modal-body-container gap-1">
            <FieldDataRender textLabel="from-warehouse" value={singleData.from_warehouse} />
            <FieldDataRender textLabel="to-warehouse" value={singleData.to_warehouse} />
            <FieldDataRender textLabel="product" value={singleData.product_name} />
            <FieldDataRender textLabel="quantity" value={singleData.quantity} />
            <FieldDataRender textLabel="status" value={statusMutation()} />
            <FieldDataRender textLabel="created by" value={singleData.creator} />
            {singleData.approver && <FieldDataRender textLabel="approved by" value={singleData.approver} />}
            {singleData.acceptor && <FieldDataRender textLabel="shipment received by" value={singleData.acceptor} />}
            {singleData.rejector && <FieldDataRender textLabel="rejected by" value={singleData.rejector} />}
            <FieldDataRender
              textLabel="type"
              value={
                singleData?.approver?.includes("super-admin") && singleData?.creator?.includes("super-admin")
                  ? "auto-mutation"
                  : "manual-mutation"
              }
              // value 2 is super-admin's id_user
            />
            <FieldDataRender textLabel="created at" value={dateFormatting(singleData.createdAt)} />
            <LastUpdatedBy />
            {admin.id_role === 1 || admin.id_warehouse === singleData.from_id_warehouse ? (
              <RequestedAction
                singleData={singleData}
                approveBtnHandler={approveBtnHandler}
                rejectBtnHandler={rejectBtnHandler}
              />
            ) : (
              <RequesterAction singleData={singleData} acceptBtnHandler={acceptBtnHandler} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
