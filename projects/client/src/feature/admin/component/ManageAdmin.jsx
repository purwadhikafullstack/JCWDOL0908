import React from "react";
import RenderAdminsData from "./all_admin/RenderAdminsData";
import AddNewAdmin from "./all_admin/create_data/AddNewAdmin";
import DeleteAdminModal from "./all_admin/delete_data/DeleteAdminModal";
import EditAdminModal from "./all_admin/edit_data/EditAdminModal";
import AdminPagination from "../../../components/AdminPagination";
import { useManageAdminBody } from "../util/useManageAdminBody";
import NoData from "../../../components/NoData";

function ManageAdmin(props) {
  const { page, setPage } = props;
  const {
    editClicked,
    setEditClicked,
    deletedClicked,
    setDeleteClicked,
    warehouseCities,
    addNewAdminClicked,
    setNewAdminClicked,
    editBtnHndler,
    allAdmin,
  } = useManageAdminBody(page);

  const AllAdminDataBody = () => {
    return (
      <div className="row-span-9 grid grid-rows-9 gap-3 lg:gap-2">
        <div
          className="row-span-1 font-semibold grid lg:grid-cols-5
          grid-cols-6 items-center text-xs pl-2 lg:text-base"
        >
          <p className="col-span-1">name</p>
          <p className="hidden lg:inline lg:col-span-1">phone</p>
          <p className="col-span-2 text-center lg:text-left lg:col-span-1">warehouse</p>
          <p className="col-span-2 lg:col-span-1">location</p>
          <p className="text-right">action</p>
        </div>
        <RenderAdminsData allAdmin={allAdmin} editBtnHndler={editBtnHndler} setDeleteClicked={setDeleteClicked} />
      </div>
    );
  };

  const CreateNewAdmin = () => {
    return (
      <div className="row-span-1 grid items-center">
        <button
          className="bg-primary text-white px-2 py-1 text-base 
          font-semibold lg:w-1/3"
          onClick={() => setNewAdminClicked(true)}
        >
          <i className="uil uil-plus"></i> New Admin
        </button>
      </div>
    );
  };

  const ManageAdminModals = () => {
    return (
      <>
        {editClicked ? (
          <EditAdminModal setModal={setEditClicked} page={page} warehouseCities={warehouseCities} />
        ) : null}
        {addNewAdminClicked ? (
          <AddNewAdmin setNewAdminClicked={setNewAdminClicked} warehouseCities={warehouseCities} page={page} />
        ) : null}
        {deletedClicked ? <DeleteAdminModal setDeleteClicked={setDeleteClicked} page={page} /> : null}
      </>
    );
  };

  return (
    <>
      <ManageAdminModals />
      <div className="row-span-6 grid grid-rows-12">
        <div className="row-span-1 flex text-center items-center">
          <h1 className="text-lg font-semibold lg:text-xl">Admin-Warehouse List</h1>
        </div>
        {allAdmin?.dataAll?.length > 0 ? <AllAdminDataBody /> : <NoData text="data" />}
        <CreateNewAdmin />
        <div className="pagination-container">
          <AdminPagination pageNum={page} setPageNum={setPage} totalPage={allAdmin.totalPage} />
        </div>
      </div>
    </>
  );
}

export default ManageAdmin;
