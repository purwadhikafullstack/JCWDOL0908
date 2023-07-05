import React from "react";

function HeaderModal(props) {
  const { singleUser } = props;
  return (
    <>
      <h1 className="modal-header-text">Detail Data ID : {singleUser.id_user}</h1>
    </>
  );
}

export default HeaderModal;
