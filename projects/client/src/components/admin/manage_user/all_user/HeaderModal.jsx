import React from "react";

function HeaderModal(props) {
  const {
    singleUser,
    // setEditState
  } = props;
  return (
    <>
      <h1 className="font-semibold">Detail Data ID : {singleUser.id_user}</h1>
      {/* <div>
        {singleUser.role !== "super-admin" ? (
          <button className="bg-slate-200 text-slate-800 py-1 px-2" onClick={() => setEditState(true)}>
            <i className="uil uil-pen"></i> edit
          </button>
        ) : null}
      </div> */}
    </>
  );
}

export default HeaderModal;
