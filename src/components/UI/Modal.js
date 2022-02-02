import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const overlayElement = document.querySelector("#overlays");

const Modal = (props) => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, overlayElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
        </>
    );
};

export default Modal;
