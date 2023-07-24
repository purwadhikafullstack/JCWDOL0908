import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderSingleAdminToDelete from "./RenderSingleAdminToDelete";
import { deleteUserData, getAllAdmin } from "../../../../../feature/admin";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";

function DeleteAdminModal(props) {
  const { setDeleteClicked, page } = props;
  const dispatch = useDispatch();
  const singleData = useSelector((state) => state.admin.singleUser);

  const delButtonHandler = async (id_user) => {
    const deleteAdminBtn = document.getElementsByClassName("delete-modal-confirmation-btn");
    deleteAdminBtn.disabled = true;
    const result = await deleteUserData(id_user);
    alert(result.message);
    await dispatch(getAllAdmin(page));
    deleteAdminBtn.disabled = false;
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setDeleteClicked} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Detail Admin</h1>
          <div className="modal-body-container">
            <RenderSingleAdminToDelete singleData={singleData} />
          </div>
          <h3 className="text-center">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <button
            className="delete-modal-confirmation-btn btn-disabled"
            onClick={() => delButtonHandler(singleData.id_user)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAdminModal;
