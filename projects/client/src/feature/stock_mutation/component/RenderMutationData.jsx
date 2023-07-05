import React from "react";

function RenderMutationData(props) {
  const { dataList, singleItemClickedHandler } = props;

  const cutString = (string) => {
    const limit = 13;
    return string?.length > limit ? string.slice(0, limit) + "..." : string;
  };

  return dataList?.map((data) => {
    let status;
    if (data.is_reject) {
      status = "rejected";
    } else if (!data.is_approve) {
      status = "waiting for approval";
    } else if (data.is_accepted) {
      status = "shipped";
    } else if (data.is_sending) {
      status = "on-delivery";
    }
    return (
      <div
        key={data.id_mutation}
        onClick={() => singleItemClickedHandler(data)}
        className="row-span-1 font-normal grid lg:grid-cols-7 text-primary
        grid-cols-6 items-center text-xs pl-2 lg:text-sm bg-slate-100 cursor-pointer"
      >
        <p className="col-span-2 lg:col-span-1">{data.from_warehouse}</p>
        <p className="col-span-1 text-center lg:text-left lg:col-span-1">{data.to_warehouse}</p>
        <p className="col-span-2 lg:col-span-1 text-center">{cutString(data.product_name)}</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">{data.quantity}</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">{cutString(data.creator)}</p>
        <p className="text-center">{cutString(status)}</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">
          {cutString(data.updatedAt.split("T").join(" "))}
        </p>
      </div>
    );
  });
}

export default RenderMutationData;
