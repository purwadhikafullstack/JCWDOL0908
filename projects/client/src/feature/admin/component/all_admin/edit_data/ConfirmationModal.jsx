import React from "react";

function ConfirmationModal(props) {
  const { formikProps } = props;
  return (
    <div className="conf-modal-background">
      <div className="conf-modal-container">
        <h1 className="conf-modal-header-text">Are you sure to submit?</h1>
        <div className="conf-modal-btn-container">
          <button
            id="confirm-admin-btn"
            className="conf-modal-btn-confirm btn-disabled"
            type="submit"
            disabled={formikProps.isSubmitting}
          >
            Confirm
          </button>
          <div className="conf-modal-btn-cancel" onClick={() => props.setConfirmationModal(false)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
