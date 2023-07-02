import React from "react";
import RenderCategoryOptions from "../RenderCategoryOptions";

function CustomSelectCategory({ label, formik, name, categories }) {
  return (
    <div className="relative grid grid-cols-8 gap-2 items-center">
      <label className="text-left text-slate-800 text-xs font-semibold my-0 col-span-2">{label}</label>
      <p className="font-semibold">:</p>
      <select
        name={name}
        className={
          formik.touched[name] && formik.errors[name]
            ? " placeholder:text-xs text-xs placeholder-red-500 bg-gray-100 border-2" +
              " border-red-500 text-red-500 h-10 my-1 shadow-slate-800" +
              " sm:text-xs rounded-none focus:ring-red-500 focus:border-red-500 block w-full" +
              " px-2 placeholder col-span-5 h-fit py-1"
            : " placeholder:text-xs text-xs bg-gray-50 border border-gray-300 text-slate-800" +
              " sm:text-xs rounded-none h-10 my-1 shadow-slate-800" +
              " focus:ring-light focus:border-light block w-full px-2" +
              " placeholder col-span-5 h-fit py-1"
        }
        onChange={formik.handleChange}
        value={formik.values[name]}
      >
        <option value={""}>select category</option>
        <RenderCategoryOptions categories={categories} />
      </select>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="absolute text-red-500 text-xs right-0 top-7 pt-1 font-normal">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}

export default CustomSelectCategory;
