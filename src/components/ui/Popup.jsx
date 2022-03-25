import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import styles from "./Popup.module.css"

const Popup = (props) => {
  const dispatch = useDispatch()

  const onCloseHandler = () => {
    dispatch(uiActions.hideToast())
  }

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ToastContainer className={styles.toast}>
          <Toast bg="warning" onClose={onCloseHandler} show={props.show} delay={2000} autohide>
            <Toast.Header closeButton={false}>              
              <strong className="me-auto">{props.header}</strong>
            </Toast.Header>
            <Toast.Body className="text-dark">{props.body}</Toast.Body>
          </Toast>
        </ToastContainer>,
        document.getElementById("toast-root")
      )}
    </Fragment>
  );
};

export default Popup;
