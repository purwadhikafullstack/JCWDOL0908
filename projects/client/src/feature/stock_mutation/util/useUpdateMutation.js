import { acceptDeliveredProducts, approveMutationRequests, rejectMutationRequests } from "../";

export const useUpdateMutation = (setSingleItemClicked, admin, singleData, fetchingData) => {
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
    const approveBtn = document.getElementById("approve-mutation-btn");
    const rejectBtn = document.getElementById("reject-mutation-btn");
    approveBtn.disabled = true;
    rejectBtn.disabled = true;
    const data = { adminData: admin, mutationData: singleData };
    const response = await approveMutationRequests(data);
    alert(response.message);
    await fetchingData();
    approveBtn.disabled = false;
    rejectBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const rejectBtnHandler = async () => {
    const approveBtn = document.getElementById("approve-mutation-btn");
    const rejectBtn = document.getElementById("reject-mutation-btn");
    approveBtn.disabled = true;
    rejectBtn.disabled = true;
    const data = { adminData: admin, mutationData: singleData };
    const response = await rejectMutationRequests(data);
    alert(response.message);
    await fetchingData();
    approveBtn.disabled = false;
    rejectBtn.disabled = false;
    setSingleItemClicked(false);
  };

  const acceptBtnHandler = async () => {
    const acceptBtn = document.getElementById("accept-mutation-btn");
    acceptBtn.disabled = true;
    const data = { adminData: admin, mutationData: singleData };
    const response = await acceptDeliveredProducts(data);
    alert(response.message);
    await fetchingData();
    acceptBtn.disabled = false;
    setSingleItemClicked(false);
  };

  return {
    acceptBtnHandler,
    rejectBtnHandler,
    approveBtnHandler,
    dateFormatting,
    statusMutation,
  };
};
