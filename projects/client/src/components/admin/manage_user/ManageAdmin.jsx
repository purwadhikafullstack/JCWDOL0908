import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleAdminModal from "./all_admin/SingleAdminModal";
import { getSingleWarehouseAdmin, getWarehouseCities } from "../../../feature/admin/AdminSlice";
import RenderAdminsData from "./all_admin/RenderAdminsData";
import Pagination from "./all_admin/Pagination";

function ManageAdmin(props) {
  const dispatch = useDispatch();
  const [editClicked, setEditClicked] = useState(false);
  const [warehouseCities, setWarehouseCities] = useState([]);

  const editBtnHndler = async (id) => {
    await dispatch(getSingleWarehouseAdmin(id));
    setEditClicked(true);
  };

  const getDataWarehouseCities = async () => {
    const data = await getWarehouseCities();
    setWarehouseCities([...data]);
  };

  useEffect(() => {
    getDataWarehouseCities();
  }, []);

  useEffect(() => {
    getDataWarehouseCities();
  }, [editClicked]);

  const addPageNum = () => {
    props.setPage(props.page + 1);
  };

  const minusPageNum = () => {
    props.setPage(props.page - 1);
  };

  const allAdmin = useSelector((state) => state.admin.allAdmin);

  return (
    <>
      {editClicked ? (
        <SingleAdminModal setModal={setEditClicked} page={props.page} warehouseCities={warehouseCities} />
      ) : null}
      <div className="row-span-6 grid grid-rows-8 gap-2">
        <div className="row-span-6 grid grid-rows-6">
          <div className="row-span-1 flex text-center items-center">
            <h1 className="text-lg font-semibold">Admin-Warehouse List</h1>
          </div>
          <div className=" row-span-5 grid grid-rows-8 gap-3">
            <div
              className="row-span-1 font-semibold grid
              grid-cols-6 items-center text-xs pl-2"
            >
              <p className="col-span-1">name</p>
              <p className="col-span-2 text-center">warehouse</p>
              <p className="col-span-2">location</p>
              <p className="text-center">action</p>
            </div>
            <RenderAdminsData allAdmin={allAdmin} editBtnHndler={editBtnHndler} />
          </div>
        </div>
        <div className="row-span-1 grid items-center">
          <button
            className="bg-green-800 text-white px-2 py-1 text-base 
          font-semibold"
          >
            <i className="uil uil-plus"></i> New Admin
          </button>
        </div>
        <div
          className="items-center row-span-1 py-2 grid grid-cols-7 text-slate-800
          text-lg"
        >
          <Pagination minusPageNum={minusPageNum} page={props.page} addPageNum={addPageNum} allAdmin={allAdmin} />
        </div>
      </div>
    </>
  );
}

export default ManageAdmin;
