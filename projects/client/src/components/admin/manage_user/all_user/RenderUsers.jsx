import React from "react";

function RenderUsers(props) {
  const { allUserData, dataClicked } = props;

  const cutString = (string) => {
    return string.length > 12 ? string.slice(0, 10) + "..." : string;
  };

  return allUserData.dataAll.map((data) => {
    return (
      <div
        key={data.id_user}
        className="row-span-1 bg-slate-100 px-2 grid lg:px-10 
        grid-cols-6 items-center hover:cursor-pointer lg:grid-cols-5"
        onClick={() => dataClicked(data.id_user, data.is_admin, data.id_role)}
      >
        <p className="col-span-1">{data.id_user}</p>
        <p className="col-span-2 lg:col-span-1">{cutString(data.username)}</p>
        <p className="col-span-2 lg:col-span-1">{cutString(data.email)}</p>
        <p className="hidden lg:inline lg:col-span-1">{data.phone_number}</p>
        <p className="col-span-1 text-right">{data.is_admin ? "admin" : "user"}</p>
      </div>
    );
  });
}

export default RenderUsers;
