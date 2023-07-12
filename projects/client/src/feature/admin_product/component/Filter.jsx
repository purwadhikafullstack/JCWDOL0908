import React from "react";
import RenderCategoryOptions from "./RenderCategoryOptions";

function Filter(props) {
  const { categories, filterOnChangeHandle } = props;

  return (
    <form className="text-sm font-medium w-full grid grid-cols-2 lg:grid-cols-5">
      <select
        onChange={filterOnChangeHandle}
        className="px-1 py-1 w-full default:text-sm shadow-black shadow-sm md:py-1 md:px-2 tracking-tight"
        name="category-filter"
        id="category-filter"
      >
        <option value={""}>SELECT CATEGORY</option>
        <RenderCategoryOptions categories={categories} />
      </select>
    </form>
  );
}

export default Filter;
