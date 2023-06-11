import React from "react";

function DetailUser(props) {
  const {
    // editState,
    singleUser,
    //  setIsAdminClicked
  } = props;

  return (
    <>
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
        {/* <div>
          {singleUser.role === "user" ? (
            <button
              className="px-2 py-1 text-xs bg-slate-700 text-white disabled:bg-slate-100 disabled:text-slate-400"
              disabled={!editState}
              onClick={() => setIsAdminClicked(true)}
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
        </div> */}
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
    </>
  );
}

export default DetailUser;
