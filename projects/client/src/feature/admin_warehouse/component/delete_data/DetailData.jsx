import React from "react";

function RenderDetailData(props) {
  const { warehouseData } = props;

  const cutStringAddress = (string) => {
    const limit = 55;
    return string.length > limit ? string.slice(0, limit) + "..." : string;
  };

  const cutString = (string) => {
    const limit = 14;
    return string.length > limit ? string.slice(0, limit) : string;
  };

  return (
    <div className="grid grid-rows-5 gap-1">
      <div className="grid grid-cols-11 items-center">
        <h1 className="col-span-3">warehouse</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{warehouseData.warehouse_name}</h1>
      </div>
      <div className="grid grid-cols-11 items-center">
        <h1 className="col-span-3">address</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{cutStringAddress(warehouseData.address)}</h1>
      </div>
      <div className="grid grid-cols-11 items-center">
        <h1 className="col-span-3">city</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">
          {warehouseData.type_city} {warehouseData.city}
        </h1>
      </div>
      <div className="grid grid-cols-11 items-center">
        <h1 className="col-span-3">province</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">{warehouseData.province}</h1>
      </div>
      <div className="grid grid-cols-11 items-center">
        <h1 className="col-span-3">lat, long</h1>
        <h1 className="col-span-1 text-center">:</h1>
        <h1 className="col-span-7">
          {cutString(warehouseData.latitude)}, {cutString(warehouseData.longitude)}
        </h1>
      </div>
    </div>
  );
}

export default RenderDetailData;
