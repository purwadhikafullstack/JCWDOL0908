import React from "react";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";
import FieldDataRender from "./FieldDataRender";
import RequestedAction from "./RequestedAction";
import RequesterAction from "./RequesterAction";
import { acceptDeliveredProducts, approveMutationRequests, rejectMutationRequests } from "../../../";

function UpdateModal(props) {
  const { setSingleItemClicked, admin, singleData, fetchingData } = props;
  console.log(singleData);

  const statusMutation = () => {
    let status;
    if (!singleData.is_approve && !singleData.is_reject) {
      status = "waiting for approval";
    } else if (singleData.is_accepted) {
      status = "shipped";
    } else if (singleData.is_reject) {
      status = "rejected";
    } else if (singleData.is_sending) {
      status = "on-delivery";
    }
    return status;
  };

  const LastUpdatedBy = () => {
    if (singleData.is_accepted) {
      return (
        <>
          <FieldDataRender textLabel="accepted at" value={dateFormatting(singleData.updatedAt)} />
        </>
      );
    } else if (singleData.is_reject) {
      return (
        <>
          <FieldDataRender textLabel="rejected at" value={dateFormatting(singleData.updatedAt)} />
        </>
      );
    } else if (singleData.is_approve) {
      return (
        <>
          <FieldDataRender textLabel="approve and send at" value={dateFormatting(singleData.updatedAt)} />
        </>
      );
    } else return <></>;
  };

  const dateFormatting = (dateString) => {
    const date = new Date(dateString);
    const formattedDateTime = date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC", // Adjust this according to your desired time zone
    });
    return `${formattedDateTime}`; // Combine date and time
  };

  const approveBtnHandler = async () => {
    const data = { adminData: admin, mutationData: singleData };
    console.log(JSON.stringify(data));
    const response = await approveMutationRequests(data);
    alert(response.message);
    await fetchingData();
    setSingleItemClicked(false);
  };

  const rejectBtnHandler = async () => {
    const data = { adminData: admin, mutationData: singleData };
    const response = await rejectMutationRequests(data);
    alert(response.message);
    await fetchingData();
    setSingleItemClicked(false);
  };

  const acceptBtnHandler = async () => {
    const data = { adminData: admin, mutationData: singleData };
    const response = await acceptDeliveredProducts(data);
    alert(response.message);
    await fetchingData();
    setSingleItemClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setSingleItemClicked} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Detail Requests</h1>
          <div className="modal-body-container gap-1">
            <FieldDataRender textLabel="created by" value={singleData.creator} />
            <FieldDataRender textLabel="requester-warehouse" value={singleData.to_warehouse} />
            <FieldDataRender textLabel="requested-warehouse" value={singleData.from_warehouse} />
            <FieldDataRender textLabel="product" value={singleData.product_name} />
            <FieldDataRender textLabel="quantity" value={singleData.quantity} />
            <FieldDataRender textLabel="status" value={statusMutation()} />
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
