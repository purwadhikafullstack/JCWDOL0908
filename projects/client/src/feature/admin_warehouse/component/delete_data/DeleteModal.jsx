import React from "react";
import RenderDetailData from "./DetailData";
import { deleteWarehouse, getWarehouses } from "../../../../feature/admin_warehouse";
import ClosedBtnModal from "../../../../components/ClosedBtnModal";

function DeleteModal(props) {
  const { setIsDelBtnClicked, warehouseData, setWarehouses, pageNum, setTotalPage } = props;

  const delBtnHandler = async (id_warehouse) => {
    const deleteData = await deleteWarehouse(id_warehouse);
    alert(deleteData.message);
    const data = await getWarehouses(pageNum);
    const { result, totalPage } = data;
    setTotalPage(totalPage);
    setWarehouses([...result]);
    setIsDelBtnClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setIsDelBtnClicked} />
        <div className="modal-header-container">
          <h1 className="modal-header-text">Detail Warehouse ID: {warehouseData.id_warehouse}</h1>
          <div className="modal-body-container">
            <RenderDetailData warehouseData={warehouseData} />
          </div>
          <h3 className="text-center">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <button className="delete-modal-confirmation-btn" onClick={() => delBtnHandler(warehouseData.id_warehouse)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
