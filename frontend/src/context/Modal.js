import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import background from './light-green-watercolor-background-1.jpeg';
import logo from './logo.png'

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
          <img id='logo-image' src={logo} alt='logo' />
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
