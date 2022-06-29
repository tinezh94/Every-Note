import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditNoteForm from './EditNoteForm';

const EditNoteModal = ({ note }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditNoteForm note={note} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditNoteModal;
