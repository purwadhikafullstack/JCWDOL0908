import { useField } from "formik";
import React from "react";

function CustomSelect({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative grid grid-cols-8 gap-2 items-center">
      <>
        <label
          className="text-left text-slate-800
        text-xs font-medium my-0 col-span-2"
        >
          {label}
        </label>
        <p>:</p>
        <select
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? " placeholder:text-xs text-xs placeholder-red-500 bg-gray-100 border-2" +
                " border-red-500 text-red-500 h-10 my-1 shadow-slate-800" +
                " sm:text-xs rounded-none focus:ring-red-500 focus:border-red-500 block w-full" +
                " px-2 placeholder col-span-5 h-fit py-1"
              : " placeholder:text-xs text-xs bg-gray-50 border border-gray-300 text-slate-800" +
                " sm:text-xs rounded-none h-10 my-1 shadow-slate-800" +
                " focus:ring-light focus:border-light block w-full px-2" +
                " placeholder col-span-5 h-fit py-1"
          }
        />
      </>
      {meta.touched && meta.error && (
        <div className="absolute text-red-500 text-xs right-0 top-7 pt-1 font-normal">{meta.error}</div>
      )}
    </div>
  );
}

export default CustomSelect;
