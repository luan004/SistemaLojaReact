import React from "react";

import "../../style/Modal.css";

function Modal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-message">
                    <p>{props.message}</p>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button" onClick={props.onConfirm}>
                        {props.confirmText}
                    </button>
                    <button className="modal-button" onClick={props.onCancel}>
                        {props.cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;