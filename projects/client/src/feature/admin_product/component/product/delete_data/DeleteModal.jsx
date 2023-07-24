import React, { useState } from "react";
import DetailData from "./DetailData";
import { deleteProduct } from "../../../";
import ClosedBtnModal from "../../../../../components/ClosedBtnModal";

function DeleteModal(props) {
  const { setDeleteClicked, singleProduct, refetchedData } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [preview, setPreview] = useState(`${REACT_APP_SERVER_URL + singleProduct.product_image}`);

  const deleteDataHandler = async () => {
    const deleteProductBtn = document.getElementsByClassName("delete-modal-confirmation-btn");
    deleteProductBtn.disabled = true;
    const response = await deleteProduct(singleProduct.id_product);
    alert(response.message);
    await refetchedData();
    deleteProductBtn.disabled = false;
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ClosedBtnModal setModal={setDeleteClicked} />
        <div className="flex flex-col gap-2">
          <h1 className="modal-header-text">Detail Data</h1>
          <div className="modal-body-container">
            <div
              className="mx-auto hover:cursor-pointer w-60 h-40 flex items-center justify-center border-2 border-slate-100
            lg:w-80 lg:h-60"
            >
              <img
                src={preview}
                alt="category_image"
                id="image_preview"
                className={`mx-auto object-contain ${preview ? "w-full h-full" : "hidden"}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <DetailData singleProduct={singleProduct} />
          </div>
          <h3 className="text-center mt-8 mb-2">
            Are you sure want to <i className="font-bold">delete</i> this data?
          </h3>
          <div className="w-full flex justify-center">
            <button className="delete-modal-confirmation-btn btn-disabled" onClick={deleteDataHandler}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
