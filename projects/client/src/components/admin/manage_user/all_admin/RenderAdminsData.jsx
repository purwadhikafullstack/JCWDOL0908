import React from "react";
import { useDispatch } from "react-redux";
import { getSingleUser } from "../../../../feature/admin/AdminSlice";

function RenderAdminsData(props) {
  const { allAdmin, editBtnHndler, setDeleteClicked } = props;
  const dispatch = useDispatch();

  const cutString = (string) => {
    return string.length > 15 ? string.slice(0, 10) + "..." : string;
  };

  const delBtnHandler = async (id_user, id_role) => {
    setDeleteClicked(true);
    await dispatch(getSingleUser(id_user, true, id_role));
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
        <div className="col-span-1 grid grid-cols-2 h-full">
          <button className="col-span-1 bg-slate-300 text-slate-800 h-full" onClick={() => editBtnHndler(data.id_user)}>
            <i className="uil uil-pen"></i>
          </button>
          <button
            className="col-span-1 bg-red-600 text-white h-full"
            onClick={() => {
              delBtnHandler(data.id_user, data.id_role);
            }}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderAdminsData;
