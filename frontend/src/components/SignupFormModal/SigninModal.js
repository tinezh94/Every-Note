import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
// import SignupForm from "./SignupForm";
import './SignupForm.css';
import { Modal } from '../../context/Modal';
import LoginForm from "../LoginFormModal/LoginForm";

function SigninModal() {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <div className='switch-to-login-div'>
        <button className='login-to-account' onClick={() => setShowModal(true)}>Sign In</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default SigninModal;
