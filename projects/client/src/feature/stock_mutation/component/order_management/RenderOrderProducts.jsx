import React from "react";

function RenderOrderProducts(props) {
  const { orderData, singleItemHandler } = props;

  const currencyFormat = (numbers) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(numbers);
  };

  return orderData?.map((data) => {
    const total = data.total_price;
    return (
      <div
        key={data.id_transaction}
        onClick={() => singleItemHandler(data)}
        className="row-span-1 bg-slate-100 font-normal text-primary grid md:grid-cols-8
        grid-cols-6 items-center pl-2 text-xs hover:cursor-pointer"
      >
        <p className="col-span-1 font-semibold">{data.user}</p>
        <p className="col-span-2 text-center lg:col-span-1">{data.shipping_service}</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">{currencyFormat(data.products_price)}</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">{currencyFormat(data.shipping_cost)}</p>
        <p className="col-span-2 md:col-span-2 lg:col-span-1 text-center">{currencyFormat(total)}</p>
        <p className="col-span-1 text-center">{data.status_order}</p>
        <p className="hidden md:inline md:col-span-2  md:text-center">{new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    );
  });
}

export default RenderOrderProducts;
