import React from "react";

function ConfirmationModal(props) {
  const { formikProps } = props;
  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
    flex items-center justify-center"
    >
      <div
        className="px-4 w-2/3 bg-slate-50 relative md:translate-x-24 md:w-1/2
      lg:w-1/3 py-4"
      >
        <h1 className="mb-6 text-lg font-bold">Are you sure to submit?</h1>
        <div className="flex flex-row gap-4">
          <button className="py-1 px-2 bg-green-800 text-white" type="submit" disabled={formikProps.isSubmitting}>
            Confirm
          </button>
          <div className="py-1 px-2 bg-red-800 text-white" onClick={() => props.setConfirmationModal(false)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
