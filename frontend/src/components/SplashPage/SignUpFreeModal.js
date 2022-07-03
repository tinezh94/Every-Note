import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import SignupForm from "../SignupFormModal/SignupForm";
import '../SignupFormModal/SignupForm.css';
import { Modal } from '../../context/Modal';

function SignupFreeModal() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <div className='signup-button-div'>
        <button className='splash-page-signup-button' onClick={() => setShowModal(true)}>Sign Up For Free</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFreeModal;
