import React from "react";
import { useSelector } from "react-redux";
import DetailUser from "./DetailUser";
import HeaderModal from "./HeaderModal";

function SingleUserModal(props) {
  const singleUser = useSelector((state) => state.admin.singleUser);
  // const [editState, setEditState] = useState(false);
  // const [isAdminClicked, setIsAdminClicked] = useState(false);

  return (
    <div
      className="fixed maxvh maxvw bg-white z-30 top-0 left-0 modal-container
    flex items-center justify-center"
    >
      <div
        className="py-14 px-6 w-5/6 bg-slate-50 relative md:translate-x-24 md:w-1/2
      lg:w-1/3 max-h-96"
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
            <HeaderModal
              singleUser={singleUser}
              // setEditState={setEditState}
            />
          </div>
          <div className="mt-10 mb-4 flex flex-col gap-2">
            <DetailUser
              singleUser={singleUser}
              // editState={editState}
              // setIsAdminClicked={setIsAdminClicked}
            />
          </div>
          {/* {isAdminClicked ? (
            <div className="flex flex-row gap-4">
              <button
                className="py-1 px-2 text-sm bg-green-800 text-white"
                onClick={() => {
                  setEditState(false);
                  setIsAdminClicked(false);
                }}
              >
                confirm
              </button>
              <button
                className="py-1 px-2 text-sm bg-red-800 text-white"
                onClick={() => {
                  setEditState(false);
                  setIsAdminClicked(false);
                }}
              >
                cancel
              </button>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default SingleUserModal;
