import { Menu } from "@headlessui/react";
import { sortTypes } from "../../../helper/const";


function FilterSort({ sort, setSort }) {
  return (
    <Menu as="div" className="flex flex-col">
      <Menu.Button
        className="font-title text-left text-lg border rounded-md hover:border-primary px-3 py-1 cursor-pointer">Sort
        by : <span className="capitalize">{sort.type} {sort.value}</span></Menu.Button>
      <Menu.Items className="flex flex-col shadow-lg border">
        {
          sortTypes.map((sortType, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={`${active ? "bg-gray-200" : "bg-gray-50"} capitalize block px-4 py-2 text-sm text-gray-700 w-full text-left font-title`}
                  onClick={() => setSort(sortType)}
                >
                  {sortType.type} {sortType.value}
                </button>
              )}
            </Menu.Item>
          ))
        }
      </Menu.Items>
    </Menu>
  );
}

export default FilterSort;