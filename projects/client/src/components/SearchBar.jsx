import React from "react";

function SearchBar(props) {
  const { onChangeHandler } = props;
  return (
    <div className="flex items-center">
      <div className="flex border-slate-200 gap-2">
        <div>
          <input
            onChange={onChangeHandler}
            type="text"
            className="block w-full px-4 py-1 text-slate-700 bg-white border focus:border-slate-400 focus:ring-slate-300 
            focus:outline-none focus:ring focus:ring-opacity-40 md:py-1"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
