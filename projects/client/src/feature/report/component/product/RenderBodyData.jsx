import React from "react";

function RenderBodyData(props) {
  return (
    <div className="row-span-10 grid grid-rows-8 gap-2 lg:gap-2">
      <div
        className="row-span-1 font-semibold grid md:grid-cols-7
    grid-cols-5 items-end text-xs pl-2 lg:text-sm font-title"
      >
        <p className="col-span-2 md:col-span-3">product</p>
        <p className="hidden md:inline lg:col-span-1 lg:text-center">last month qty</p>
        <p className="col-span-1 text-center">add.</p>
        <p className="col-span-1 text-center">subs.</p>
        <p className="col-span-1 text-center">total</p>
      </div>
      {props.children}
    </div>
  );
}

export default RenderBodyData;
