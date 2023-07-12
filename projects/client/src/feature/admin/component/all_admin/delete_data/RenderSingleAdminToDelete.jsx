import React from "react";

function RenderSingleAdminToDelete(props) {
  const { singleData } = props;
  return (
    <div className="grid grid-rows-6 gap-1">
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">ID</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.id_user}</h1>
      </div>
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">username</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.username}</h1>
      </div>
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">email</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.email}</h1>
      </div>
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">phone number</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.phone_number}</h1>
      </div>
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">role</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.role}</h1>
      </div>
      <div className="grid grid-cols-11">
        <h1 className="col-span-3">warehouse</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{singleData.warehouse + ", " + singleData.cityType + " " + singleData.city}</h1>
      </div>
    </div>
  );
}

export default RenderSingleAdminToDelete;
