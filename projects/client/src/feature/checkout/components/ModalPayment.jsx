import { Dialog } from "@headlessui/react";
import { H3 } from "../../../components/Typo";
import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { paymentProof } from "../api/paymentProof";

function ModalPayment({ isOpen, onClose, setTrigger, transaction }) {
  const [paymentProofImg, setPaymentProofImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const handlePaymentProof = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", paymentProofImg);
    try {
      await paymentProof(formData, transaction.id_transaction);
      ToastSuccess("Payment proof uploaded");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      ToastError(error.message || "Something went wrong");
    }
  };

  const handlePaymentProofChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setPaymentProofImg(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  // refresh state when modal is closed
  useEffect(() => {
    setPaymentProofImg(null);
    setPreview(null);
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="sm:w-[600px]  w-[380px] bg-white rounded-sm shadow-xl p-6">
          <H3>Payment Proof #{transaction?.id_transaction}</H3>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="payment_proof">Upload your payment proof here</label>
              <input
                onChange={handlePaymentProofChange}
                type="file" name="payment_proof" id="payment_proof" accept="image/png, image/jpeg, image/jpg" />
              <p className="text-xs text-gray-400">Max file size: 5MB</p>
            </div>
            {
              preview && (
                <div className="flex flex-col h-[90px] w-[90px] bg-gray-200 rounded-md">
                  <img src={preview} alt="preview" className="h-full w-full object-cover rounded-md" />
                </div>
              )
            }
            <div className="flex flex-row gap-3 font-title mt-3 ml-auto">
              <button className="bg-gray-200 text-gray-500 py-2 w-fit px-8 rounded-md" onClick={onClose}>Close</button>
              <button
                disabled={!paymentProof}
                className="bg-primary text-white py-2 w-fit px-8 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePaymentProof}>
                Upload
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ModalPayment;