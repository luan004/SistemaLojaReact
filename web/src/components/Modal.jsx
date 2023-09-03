import React from "react";

import "../style/Modal.css";

function Modal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-message">
                    <span>{props.message}</span>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={props.onConfirm}>
                        {props.confirmText}
                    </button>
                    <button className="modal-button cancel" onClick={props.onClose}>
                        {props.cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;