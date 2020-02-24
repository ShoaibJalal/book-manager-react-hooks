import React from "react";
import { MDBBtn } from "mdbreact";

import "./ErrorModal.css";

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <MDBBtn outline color="danger" onClick={props.onClose}>
            Okay
          </MDBBtn>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
