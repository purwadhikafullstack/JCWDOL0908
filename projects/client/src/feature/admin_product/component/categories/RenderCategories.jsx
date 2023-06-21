import React from "react";
import emptyImage from "../../../../images/empty-image.jpg";

function RenderCategories(props) {
  const { categories, setSingleCategory, setDeleteClicked, setEditClicked, roleAdmin } = props;
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const delBtnHandler = (data) => {
    setSingleCategory({ ...data });
    setDeleteClicked(true);
  };

  const editBtnHandler = (data) => {
    setSingleCategory({ ...data });
    setEditClicked(true);
  };

  return categories?.map((category) => {
    return (
      <div
        key={category?.id_category}
        style={{ backgroundImage: `url(${REACT_APP_SERVER_URL + category?.category_image || emptyImage})` }}
        className="h-full grid grid-cols-3 items-center px-4 bg-cover drop-shadow-md
      gap-2 lg:grid-cols-4 lg:px-6 lg:h-full bg-slate-100 shadow-md transition hover:scale-105"
      >
        <div className="col-span-2 lg:col-span-3 text-left h-full flex items-center">
          <div className="relative">
            <p className=" text-slate-800 relative z-10">{category?.category_name}</p>
            <p className=" text-white absolute top-0 left-0 z-0 -ml-[0.1rem] mt-[0.08rem] lg:mt-[0.1rem]">
              {category?.category_name}
            </p>
          </div>
        </div>
        <div className="h-1/3 md:h-1/4 grid grid-cols-2 gap-2">
          <button
            className="bg-slate-300 disabled:bg-white disabled:border-2 lg:disabled:border-4
            disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
            onClick={() => editBtnHandler(category)}
            disabled={roleAdmin.role_admin !== "super-admin"}
          >
            <i className="uil uil-pen"></i>
          </button>
          <button
            onClick={() => delBtnHandler(category)}
            className="bg-red-600 text-white disabled:bg-white disabled:border-2 lg:disabled:border-4
            disabled:border-slate-300 disabled:cursor-not-allowed disabled:text-slate-300"
            disabled={roleAdmin.role_admin !== "super-admin"}
          >
            <i className="uil uil-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  });
}

export default RenderCategories;
