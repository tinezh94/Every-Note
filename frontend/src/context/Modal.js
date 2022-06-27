import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import background from './backgroundImage.png'

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" style={{ backgroundImage:`url(${background})`}} onClick={onClose} />
      <div id="modal-content">
        <div className='logo-image-div'>
          <img id='logo-image' src='https://cdn-icons-png.flaticon.com/512/889/889669.png' alt='post-it' />
        </div>
        <h1 id='log-in-h1'> EveryNote </h1>
        <div>
        {children}
        </div>
      </div>
    </div>,
    modalNode
  );
}
