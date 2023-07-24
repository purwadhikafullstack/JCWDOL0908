import React from "react";

function DetailOrderBody({ singleOrder, productsStock }) {
  const RenderProducts = () => {
    const products = [...singleOrder.transaction_product_rlts].sort((a, b) => a.id_product - b.id_product);

    const showIfNotCanceledOrShippedOrSending = () => {
      return !(
        singleOrder.status_order === "canceled" ||
        singleOrder.status_order === "shipped" ||
        singleOrder.status_order === "sending"
      );
    };

    return products.map((product, index) => {
      return (
        <div key={index} className="flex flex-col gap-0">
          <p>{product.product.product_name}</p>
          <p>
            {showIfNotCanceledOrShippedOrSending() && (
              <>
                <span className="font-semibold">stock</span> :{" "}
                {[...productsStock].filter((productStock) => productStock.id_product === product.id_product)[0]?.stock}
              </>
            )}
            | <span className="font-semibold"> order-qty</span> : {product.quantity + " | "}
            {showIfNotCanceledOrShippedOrSending() && (
              <>
                {productsStock[index]?.stock < product.quantity ? (
                  <span className="text-red-600 font-bold">insufficient</span>
                ) : (
                  <span className=" font-bold">sufficient</span>
                )}
              </>
            )}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col text-xs lg:text-sm my-4 gap-2">
      <div className="grid grid-cols-12 gap-2 items-center">
        <p className="text-left text-primary font-semibold my-0 col-span-3">user</p>
        <p>:</p>
        <p className="col-span-8">{singleOrder.user}</p>
      </div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <p className="text-left text-primary font-semibold my-0 col-span-3">address</p>
        <p>:</p>
        <p className="col-span-8">{singleOrder.address}</p>
      </div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <p className="text-left text-primary font-semibold my-0 col-span-3">total payment</p>
        <p>:</p>
        <p className="col-span-8">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(singleOrder.total_price)}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <p className="text-left text-primary font-semibold my-0 col-span-3">warehouse</p>
        <p>:</p>
        <p className="col-span-8">{singleOrder.warehouse.warehouse_name + ", " + singleOrder.warehouse.address}</p>
      </div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <p className={"text-left text-primary font-semibold my-0 col-span-3"}>status order</p>
        <p>:</p>
        <p className={`col-span-8 ${singleOrder.status_order === "canceled" ? "text-red-600 font-semibold" : ""}`}>
          {singleOrder.status_order}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <i className="font-semibold">PRODUCTS-LIST</i>
        <RenderProducts />
      </div>
    </div>
  );
}

export default DetailOrderBody;
