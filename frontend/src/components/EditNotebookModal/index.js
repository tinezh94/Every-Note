import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditNotebook from './EditNotebook';
import '../NotesPage/NotesPage.css';

const EditNotebookModal = ({ notebook }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='rename-notebook' onClick={() => setShowModal(true)}>Rename</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditNotebook notebook={notebook} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditNotebookModal;
