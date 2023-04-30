import React from "react";
import "./Modal.css";

const Modal = (props) => {
  // if (!props.show) {
  //   return null;
  // }

  return (
    <div className={`modal ${props.show ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>

        <div className="modal-body">{props.children}</div>

        {/* <div className="modal-footer">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
