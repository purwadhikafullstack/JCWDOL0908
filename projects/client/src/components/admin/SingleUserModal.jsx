import React from "react";

function SingleUserModal(props) {
  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
    flex items-center justify-center"
    >
      <div className=" h-48 w-3/4 bg-slate-50 relative">
        <button
          className="text-red-700 absolute top-0 right-1 font-bold text-xl"
          onClick={() => {
            props.someFunction(false);
          }}
        >
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <h1>Detail Data</h1>
        </div>
      </div>
    </div>
  );
}

export default SingleUserModal;
