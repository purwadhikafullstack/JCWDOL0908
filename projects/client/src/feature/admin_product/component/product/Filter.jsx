import React from "react";
import RenderCategoryOptions from "./add_data/RenderCategoryOptions";

function Filter(props) {
  const { setSelectedCategory, categories, setPageNum, OFFSET, LIMIT } = props;

  const onChangeHandle = async (event) => {
    const id_category = parseInt(event.target.value);
    const page = 1;
    setSelectedCategory(id_category);
  };

  return (
    <form className="text-sm font-medium">
      <select
        onChange={onChangeHandle}
        className="px-2 py-1 default:text-sm shadow-black shadow-sm"
        name="category-filter"
        id="category-filter"
      >
        <option value={0}>SELECT CATEGORY</option>
        <RenderCategoryOptions categories={categories} />
      </select>
    </form>
  );
}

export default Filter;
