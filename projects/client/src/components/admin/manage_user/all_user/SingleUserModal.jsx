import React from "react";
import { useSelector } from "react-redux";
import DetailUser from "./DetailUser";
import HeaderModal from "./HeaderModal";

function SingleUserModal(props) {
  const singleUser = useSelector((state) => state.admin.singleUser);

  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
    flex items-center justify-center"
    >
      <div
        className="py-14 px-6 w-5/6 bg-slate-50 relative md:translate-x-24 md:w-1/2
      lg:w-1/3 max-h-96 lg:text-xl"
      >
        <button
          className="text-red-700 absolute top-0 right-1 font-bold text-xl"
          onClick={() => {
            props.someFunction(false);
          }}
        >
          <i className="uil uil-times-circle"></i>
        </button>
        <div>
          <div className="flex justify-between items-center">
            <HeaderModal singleUser={singleUser} />
          </div>
          <div className="mt-10 mb-4 flex flex-col gap-2 text-sm lg:text-lg">
            <DetailUser singleUser={singleUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserModal;
