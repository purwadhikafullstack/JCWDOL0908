import { Dialog } from "@headlessui/react";
import { H3 } from "../../../components/Typo";

function ModelAddressDelete({isOpen, onClose, address, onDelete}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white rounded-md p-5 w-96">
          <H3>Are you sure you want to delete "{address?.notes}"?</H3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Address data that has been deleted cannot be returned.
            </p>
          </div>
          <div className="flex flex-row justify-center gap-3 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={() => {
                onDelete(address);
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ModelAddressDelete;