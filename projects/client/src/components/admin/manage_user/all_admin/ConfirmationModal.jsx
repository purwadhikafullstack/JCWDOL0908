import React from "react";

function ConfirmationModal(props) {
  const { formikProps } = props;
  return (
    <div
      className=" fixed w-full h-full z-30 top-0 left-0
    flex items-center justify-center bg-white modal-container"
    >
      <div
        className="px-4 w-1/2 bg-slate-50 relative md:w-full
      lg:w-full py-4 shadow-md shadow-slate-800"
      >
        <h1 className="mb-6 text-lg font-bold">Are you sure to submit?</h1>
        <div className="flex flex-row gap-4">
          <button className="py-1 px-2 bg-green-800 text-white" type="submit" disabled={formikProps.isSubmitting}>
            Confirm
          </button>
          <div
            className="py-1 px-2 bg-red-800 text-white hover:cursor-pointer"
            onClick={() => props.setConfirmationModal(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
