import React from "react";

function SearchBar() {
  return (
    <div className="flex items-center">
      <div className="flex border-slate-200 gap-2">
        <input
          type="text"
          className="block w-full px-4 py-1 text-slate-700 bg-white border focus:border-slate-400 focus:ring-slate-300 
          focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <button className="px-4 text-white bg-slate-800 border-l  ">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
