import React from "react";

function DetailUser(props) {
  const {
    // editState,
    singleUser,
    //  setIsAdminClicked
  } = props;

  return (
    <>
      <div className="flex flex-rows gap-2">
        <div>username : </div>
        <div>{singleUser.username}</div>
      </div>
      <div className="flex flex-rows gap-2">
        <div>email : </div>
        <div>{singleUser.email}</div>
      </div>
      <div className="flex flex-rows gap-2">
        <div>phone number : </div>
        <div>{singleUser.phone_number}</div>
      </div>
      <div className="flex flex-rows gap-2">
        <div>role : </div>
        <div>{singleUser.role === "user" ? "non-admin" : `${singleUser.role}`}</div>
      </div>
      {singleUser.role === "admin-warehouse" ? (
        <div className="flex flex-rows gap-2 ">
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
