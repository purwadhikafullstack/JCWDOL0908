import React, { useState } from "react";
import { deleteCategory, getCategories } from "../../../";

function DeleteModal(props) {
  const { setDeleteClicked, pageNum, singleCategory, setCategories } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [preview, setPreview] = useState(`${REACT_APP_SERVER_URL + singleCategory.category_image}`);

  const deleteDataHandler = async () => {
    const response = await deleteCategory(singleCategory.id_category);
    alert(response.message);
    const fetchedData = await getCategories(pageNum);
    await setCategories({ ...fetchedData });
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-btn-modal" onClick={() => setDeleteClicked(false)}>
          <i className="uil uil-times-circle"></i>
        </button>
        <div className="delete-modal-header-container">
          <h1 className="delete-modal-header-text">Detail Data</h1>
          <div className="delete-modal-body-container">
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
            <h1 className="text-center">
              <span className="font-bold">category name</span> : {singleCategory.category_name}
            </h1>
          </div>
        </div>
        <h3 className="text-center mt-8 mb-2">
          Are you sure want to <i className="font-bold">delete</i> this data?
        </h3>
        <div className="w-full flex justify-center">
          <button className="delete-modal-confirmation-btn" onClick={deleteDataHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
