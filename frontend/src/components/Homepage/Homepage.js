import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SideNavBar from '../SideNavBar';
import CreateNotebook from './CreateNotebook';


function Homepage() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)}>New Notebook</button>
            </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateNotebook />
                    </Modal>
                )}
            <SideNavBar />
        </>
    )

}

export default Homepage;
