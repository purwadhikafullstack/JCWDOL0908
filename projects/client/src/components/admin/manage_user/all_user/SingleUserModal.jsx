import React, { useState } from "react";
import { useSelector } from "react-redux";

function SingleUserModal(props) {
  const singleUser = useSelector((state) => state.admin.singleUser);
  const [editState, setEditState] = useState(false);
  const [isAdminClicked, setIsAdminClicked] = useState(false);

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
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Detail Data ID : {singleUser.id_user}</h1>
            <div>
              {singleUser.role !== "super-admin" ? (
                <button className="bg-slate-200 text-slate-800 py-1 px-2" onClick={() => setEditState(true)}>
                  <i class="uil uil-pen"></i> edit
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-10 mb-4 flex flex-col gap-2">
            <div className="flex flex-rows gap-2 text-sm">
              <div>username : </div>
              <div>{singleUser.username}</div>
            </div>
            <div className="flex flex-rows gap-2 text-sm">
              <div>email : </div>
              <div>{singleUser.email}</div>
            </div>
            <div className="flex flex-rows gap-2 text-sm">
              <div>phone number : </div>
              <div>{singleUser.phone_number}</div>
            </div>
            <div className="flex flex-rows gap-2 text-sm">
              <div>role : </div>
              <div>{singleUser.role === "user" ? "non-admin" : `${singleUser.role}`}</div>
              <div>
                {singleUser.role === "user" ? (
                  <button
                    className="px-2 py-1 text-xs bg-slate-700 text-white disabled:bg-slate-100 disabled:text-slate-400"
                    disabled={!editState}
                  >
                    make admin
                  </button>
                ) : (
                  <>
                    {singleUser.role !== "super-admin" ? (
                      <button
                        className="px-2 py-1 text-xs bg-slate-700 text-white disabled:bg-slate-100 
                        disabled:text-slate-400 disabled:cursor-auto"
                        disabled={!editState}
                        onClick={() => setIsAdminClicked(true)}
                      >
                        revoke admin
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            {singleUser.role === "admin-warehouse" ? (
              <div className="flex flex-rows gap-2 text-sm">
                <div>warehouse : </div>
                <div>
                  {singleUser.warehouse}, {singleUser.city}
                </div>
                <div></div>
              </div>
            ) : null}
          </div>
          {isAdminClicked ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SingleUserModal;
