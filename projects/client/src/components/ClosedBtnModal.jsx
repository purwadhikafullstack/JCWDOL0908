import React from "react";

function ClosedBtnModal(props) {
  const { setModal } = props;
  return (
    <button onClick={() => setModal(false)} className="close-btn-modal">
      <i className="uil uil-times-circle"></i>
    </button>
  );
}

export default ClosedBtnModal;
