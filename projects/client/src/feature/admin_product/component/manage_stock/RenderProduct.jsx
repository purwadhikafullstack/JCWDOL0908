import React from "react";

function RenderProduct(props) {
  const { productsList, editBtnHndler, deleteBtnHandler } = props;

  const cutString = (string) => {
    return string.length > 22 ? string.slice(0, 22) + "..." : string;
  };

  return productsList.map((product) => {
    return (
      <div
        key={product.product_name}
        className="row-span-1 grid grid-cols-6 items-center text-xs pl-2 md:text-sm lg:text-lg bg-slate-100"
      >
        <p className="col-span-2">{cutString(product.product_name)}</p>
        <p className="hidden lg:inline lg:col-span-1">{product.weight_kg}</p>
        <p className="col-span-1  lg:col-span-1 text-center">{product.totalStock}</p>
        <p className="col-span-2  lg:col-span-1 text-center">{product.bookedStock}</p>
        <div className="col-span-1 grid grid-cols-2 h-full lg:grid-cols-4 ">
          <button
            className="col-span-1 bg-slate-300 text-primary h-full lg:col-start-3"
            onClick={() => editBtnHndler(product)}
          >
            <i className="uil uil-pen"></i>
          </button>
          <button
            className="col-span-1 bg-red-600 text-white h-full lg:col-start-4"
            onClick={() => deleteBtnHandler(product)}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderProduct;
