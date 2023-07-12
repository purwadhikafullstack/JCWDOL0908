import { useEffect, useState } from "react";
import { getCategories } from "../../categories/api/getCategories";
import { ToastError } from "../../../helper/Toastify";

function FilterCategories({ filter, setFilter }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.result.categories);
    } catch (error) {
      ToastError(error.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  const handleCategory = (id) => {
    if (filter.category.includes(id)) {
      setFilter({ ...filter, category: filter.category.filter((item) => item !== id) });
    } else {
      setFilter({ ...filter, category: [...filter.category, id] });
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-title text-left text-lg  px-3 py-1">
        Categories
      </h3>
      <form className="flex flex-row flex-wrap gap-2 px-3">
        {categories.map((category) => (
          <div
            className={`flex flex-row justify-between items-center border px-3 py-1 rounded-md cursor-pointer 
            ${filter.category.includes(category.id_category) ? "border-primary" : "border-gray-200"}`}
            key={category.id_category}
            onClick={() => handleCategory(category.id_category)}
          >
            <span>{category.category_name}</span>
            <input
              type="checkbox"
              className="hidden"
              checked={filter.category.includes(category.id_category)}
              onChange={() => handleCategory(category.id_category)}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

export default FilterCategories;