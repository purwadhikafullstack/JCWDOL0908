import React from "react";

function RenderBodyData(props) {
  return (
    <div className="row-span-10 grid grid-rows-8 gap-2 lg:gap-2">
      <div
        className="row-span-1 font-semibold grid md:grid-cols-8
        grid-cols-6 items-end pl-2 text-xs lg:text-sm font-title"
      >
        <p className="col-span-1">user</p>
        <p className="col-span-2 text-center lg:col-span-1">courier-service</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">product(s) price</p>
        <p className="hidden lg:inline lg:col-span-1 lg:text-center">shipping price</p>
        <p className="col-span-2 md:col-span-2 lg:col-span-1 text-center">total price</p>
        <p className="col-span-1 text-center">status</p>
        <p className="hidden md:inline md:col-span-2  md:text-center">last updated</p>
      </div>
      {props.children}
    </div>
  );
}

export default RenderBodyData;
