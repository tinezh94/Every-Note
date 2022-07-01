import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddNeNoteForm from './AddNewNoteForm';
import '../NotesPage/NotesPage.css';

const AddNewNoteModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div className='add-new-note-container'>
            <div className='add-new-note-btn-container'>
                <button className='add-new-note' onClick={() => setShowModal(true)}>Add New Note</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddNeNoteForm hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
}

export default AddNewNoteModal;
