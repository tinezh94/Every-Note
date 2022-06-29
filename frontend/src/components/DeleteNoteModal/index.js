import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNote from './DeleteNoteForm';

const DeleteNoteModal = ({ note }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteNote note={note} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default DeleteNoteModal;
