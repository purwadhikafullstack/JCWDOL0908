import React from "react";

function RenderBodyData(props) {
  return (
    <div className="row-span-10 grid grid-rows-8 gap-2 lg:gap-2">
      <div
        className="row-span-1 font-semibold grid lg:grid-cols-7
        grid-cols-6 items-end text-xs pl-2 lg:text-sm"
      >
        <p className="col-span-2 lg:col-span-1 ">from warehouse</p>
        <p className="col-span-1 text-center">to warehouse</p>
        <p className="col-span-2 text-center lg:col-span-1">product</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">quantity</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">created by</p>
        <p className="text-center">status</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">last update</p>
      </div>
      {props.children}
    </div>
  );
}

export default RenderBodyData;
