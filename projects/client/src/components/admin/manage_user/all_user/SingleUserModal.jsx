import React from "react";
import { useSelector } from "react-redux";
import DetailUser from "./DetailUser";
import HeaderModal from "./HeaderModal";

function SingleUserModal(props) {
  const singleUser = useSelector((state) => state.admin.singleUser);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button
          className="close-btn-modal"
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
