import React from "react";

function RenderAdminsData(props) {
  const { allAdmin, editBtnHndler } = props;
  const cutString = (string) => {
    return string.length > 15 ? string.slice(0, 10) + "..." : string;
  };

  return allAdmin.dataAll.map((data) => {
    return (
      <div
        key={data.id_user}
        className="row-span-1 bg-slate-100 grid
                grid-cols-6 items-center text-xs pl-2"
      >
        <p className="col-span-1">{cutString(data.username)}</p>
        <p className="col-span-2 text-center">{cutString(data.admin_role.warehouse.warehouse_name)}</p>
        <p className="col-span-2">
          {cutString(data.admin_role.warehouse.city.type_city + " " + data.admin_role.warehouse.city.city)}
        </p>
        <button
          className="col-span-1 bg-slate-200 text-slate-800 h-full px-2"
          onClick={() => editBtnHndler(data.id_user)}
        >
          <i className="uil uil-pen"></i>edit
        </button>
      </div>
    );
  });
}

export default RenderAdminsData;
