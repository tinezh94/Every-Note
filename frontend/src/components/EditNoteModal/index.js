import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditNoteForm from './EditNoteForm';

const EditNoteModal = ({ note }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
        <div className='edit-note-btn-div'>
            <button className='edit-note-btn' onClick={() => setShowModal(true)}>Edit Note</button>
        </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditNoteForm note={note} hideForm={() => setShowModal(false)} />
                    {/* <EditNoteOnNotesPage note={note} hideForm={() => setShowModal(false)} /> */}
                </Modal>
            )}
        </>
    )
}

export default EditNoteModal;
