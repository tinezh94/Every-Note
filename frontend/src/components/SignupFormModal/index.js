import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import SignupForm from "./SignupForm";
import './SignupForm.css';
import { Modal } from '../../context/Modal';

function SignupFormModal() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <div className='home-signup-div'>
        <button className='home-signup-button' onClick={() => setShowModal(true)}>Sign Up</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
