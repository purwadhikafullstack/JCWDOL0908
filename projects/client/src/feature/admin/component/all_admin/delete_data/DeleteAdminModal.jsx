import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderSingleAdminToDelete from "./RenderSingleAdminToDelete";
import { deleteUserData, getAllAdmin } from "../../../../../feature/admin";

function DeleteAdminModal(props) {
  const { setDeleteClicked, page } = props;
  const dispatch = useDispatch();
  const singleData = useSelector((state) => state.admin.singleUser);

  const delButtonHandler = async (id_user) => {
    const result = await deleteUserData(id_user);
    alert(result.message);
    await dispatch(getAllAdmin(page));
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button onClick={() => props.setDeleteClicked(false)} className="close-btn-modal">
          <i className="uil uil-times-circle"></i>
        </button>
        <div className="delete-modal-header-container">
          <h1 className="delete-modal-header-text">Detail Admin</h1>
          <div className="delete-modal-body-container">
            <RenderSingleAdminToDelete singleData={singleData} />
          </div>
          <h3 className="text-center">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <button className="delete-modal-confirmation-btn" onClick={() => delButtonHandler(singleData.id_user)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAdminModal;
