import { Dialog } from "@headlessui/react";
import { cancelOrder } from "../api/cancelOrder";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";

function CancelOrder({ isOpen, transaction, setTrigger }) {
  const handleCancelOrder = async () => {
    try {
      await cancelOrder(transaction.id_transaction);
      ToastSuccess("Order canceled");
      setTrigger({ action: "", transaction: {} });
    } catch (error) {
      ToastError(error.message || "Something went wrong");
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setTrigger({ action: "", transaction: {} })}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="sm:w-[600px]  w-[380px] bg-white rounded-sm shadow-xl p-6 flex gap-2 flex-col">
          <Dialog.Title className="text-lg font-semibold">Cancel Order #{transaction?.id_transaction}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500">Are you sure want to cancel this
            order?</Dialog.Description>
          <div className="flex flex-row gap-2 mt-3 ml-auto">
            <button className="bg-gray-200 text-gray-500 py-2 w-fit px-8 rounded-md"
                    onClick={() => setTrigger({ action: "", transaction: {} })}>No
            </button>
            <button className="bg-primary text-white py-2 w-fit px-8 rounded-md"
                    onClick={handleCancelOrder}>Yes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CancelOrder;