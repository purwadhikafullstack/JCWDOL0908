import React, { useState } from "react";
import DetailData from "./DetailData";
import { deleteProduct, getProducts } from "../../../";

function DeleteModal(props) {
  const { setDeleteClicked, singleProduct, setProducts, pageNum, LIMIT, OFFSET, selectedCategory, setTotalPate } =
    props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [preview, setPreview] = useState(`${REACT_APP_SERVER_URL + singleProduct.product_image}`);

  const deleteDataHandler = async () => {
    console.log(singleProduct.id_product);
    const response = await deleteProduct(singleProduct.id_product);
    alert(response.message);
    const fetchedData = await getProducts(OFFSET, LIMIT, pageNum, selectedCategory);
    setProducts([...fetchedData.result.productsList]);
    setTotalPate(fetchedData.result.totalPage);
    setDeleteClicked(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="close-btn-modal" onClick={() => setDeleteClicked(false)}>
          <i className="uil uil-times-circle"></i>
        </button>
        <div className="flex flex-col gap-2">
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
          </div>
          <div className="flex flex-col gap-2">
            <DetailData singleProduct={singleProduct} />
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
    </div>
  );
}

export default DeleteModal;
