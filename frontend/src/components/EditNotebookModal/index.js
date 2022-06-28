import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditNotebook from './EditNotebook';

const EditNotebookModal = ({ notebook }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Rename Notebook</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditNotebook notebook={notebook} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default EditNotebookModal;
