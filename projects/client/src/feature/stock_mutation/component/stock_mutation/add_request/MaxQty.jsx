import React from "react";

function MaxQty(props) {
  return (
    <div className="relative grid grid-cols-8 gap-2 items-center">
      <label className="text-left text-primary text-xs font-semibold my-0 col-span-2">requested-warehouse stock</label>
      <p className="font-semibold">:</p>
      <p
        className=" text-xs bg-gray-50 text-primary sm:text-xs rounded-none
           my-1 shadow-primary focus:ring-light focus:border-light block w-full 
           px-2 placeholder col-span-5 h-fit py-1 "
      >
        {props.maxQty}
      </p>
    </div>
  );
}

export default MaxQty;
