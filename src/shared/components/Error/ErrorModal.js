import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import ErrorBackdrop from "./ErrorBackdrop.js";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const content = (
    <React.Fragment>
      {props.error && <ErrorBackdrop onClick={props.onClear} />}
      {props.error && (
        <CSSTransition
          in={props.error}
          mountOnEnter
          unmountOnExit
          timeout={200}
          classNames="error-modal"
        >
          <div className={`error-modal`}>
            <header className={`error-modal__header`}>
              <h2>
                Švihnout a mávnout!
              </h2>
            </header>
            <div className={`error-modal__content ${props.contentClass}`}>
              {props.error}
            </div>
            <button className="error-modal__button-ok" onClick={props.onClear}>Zavřít</button>
            <footer className={`error-modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
          </div>
        </CSSTransition>
      )}
    </React.Fragment>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("error-modal")
  );
};

export default ErrorModal;
