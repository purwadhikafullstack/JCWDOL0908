import React from "react";

function CreateButton(props) {
  const { admin, setFunction, text } = props;

  const isItNotSuperAdmin = () => {
    return admin?.role_admin !== "super-admin";
  };

  return (
    <div className="row-span-1 flex text-center items-end lg:grid lg:grid-cols-2">
      <button
        onClick={() => setFunction(true)}
        className="bg-primary text-white px-2 py-1 text-base 
        font-semibold lg:w-1/3 disabled:bg-white disabled:border-2 lg:disabled:border-4
        disabled:border-primaryLight disabled:cursor-not-allowed disabled:text-slate-300"
        disabled={isItNotSuperAdmin()}
      >
        <i className="uil uil-plus"></i> {text}
      </button>
    </div>
  );
}

export default CreateButton;
