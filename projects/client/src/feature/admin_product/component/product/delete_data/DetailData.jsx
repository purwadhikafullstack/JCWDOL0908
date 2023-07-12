import React from "react";

function DetailData({ singleProduct }) {
  const dataArray = [];
  const dataObject = { ...singleProduct };
  delete dataObject.createdAt;
  delete dataObject.updatedAt;
  delete dataObject.id_category;
  delete dataObject.product_image;
  delete dataObject.id_product;
  delete dataObject.is_deleted;

  for (const property in dataObject) {
    dataArray.push([property, dataObject[property]]);
  }

  return dataArray.map((data) => {
    return (
      <div key={data[0]} className="grid grid-cols-12 items-center text-sm lg:text-base">
        <h1 className="col-span-4 lg:col-span-2 font-semibold">{data[0].replace("_", " ")}</h1>
        <p className="col-span-1 font-semibold text-center">:</p>
        {data[0] === "description" ? (
          <textarea disabled className="col-span-7 lg:col-span-9 bg-slate-100 p-2" value={data[1]} />
        ) : (
          <h1 className="bg-slate-100 p-2 col-span-7 lg:col-span-9">
            {data[0] === "price"
              ? new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(data[1])
              : data[1]}
          </h1>
        )}
      </div>
    );
  });
}

export default DetailData;
