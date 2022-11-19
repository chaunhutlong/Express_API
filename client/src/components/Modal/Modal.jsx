import { useEffect, useRef } from "react";
import ReactPortal from "../ReactPortal";
import "./modalStyles.css";
import { CSSTransition } from "react-transition-group";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div className="modal bg-white" ref={nodeRef}>
          <div className="modal-content ">
            <button onClick={handleClose} className="close-btn">
              <AiOutlineClose />
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
}

export default Modal;
