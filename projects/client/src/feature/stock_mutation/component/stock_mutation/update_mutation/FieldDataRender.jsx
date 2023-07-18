import React from "react";

function FieldDataRender(props) {
  const { value, textLabel } = props;
  return (
    <div className="relative grid grid-cols-8 gap-2 items-center text-xs md:text-base">
      <label className="text-left text-primary font-semibold my-0 col-span-2">{textLabel}</label>
      <p className="font-semibold">:</p>
      <p
        className="  bg-gray-50 text-primary rounded-none
        my-1 shadow-primary focus:ring-light focus:border-light block w-full 
        px-2 placeholder col-span-5 h-fit py-1 "
      >
        {value}
      </p>
    </div>
  );
}

export default FieldDataRender;
