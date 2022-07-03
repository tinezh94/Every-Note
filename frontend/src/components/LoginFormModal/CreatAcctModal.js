import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from '../SignupFormModal/SignupForm';
import LoginForm from './LoginForm';
import './LoginForm.css';

function CreateAcctModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='switch-to-signup-div'>
        <button className='create-account' onClick={() => setShowModal(true)}>Create account</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default CreateAcctModal;
