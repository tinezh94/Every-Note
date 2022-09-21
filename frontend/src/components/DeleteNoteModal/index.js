import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNote from './DeleteNoteForm';

const DeleteNoteModal = ({ note }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <div className='delete-note-btn-div'>
                <button className='delete-note-btn' onClick={() => setShowModal(true)}>Delete</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteNote note={note} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default DeleteNoteModal;
