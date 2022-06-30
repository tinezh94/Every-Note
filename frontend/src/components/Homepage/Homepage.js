import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Modal } from '../../context/Modal';
import { getNotebooksThunk } from '../../store/notebooks';
import { getNotesThunk } from '../../store/notes';
import SideNavBar from '../SideNavBar';
// import CreateNotebook from './CreateNotebook';
import HomeNoteooksView from './HomeNotebooksView';
import HomeNotesView from './HomeNotesView';
import './Homepage.css'


function Homepage() {
    const dispatch = useDispatch();


    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes);
    const notebooks = useSelector(state => state.notebooks);

    useEffect (() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNotesThunk(sessionUser.id));
    }, [dispatch]);

    // console.log(notes)
    return (
        <div className='homepage-container'>
            {/* <div>
                <button className='add-notebook' onClick={() => setShowModal(true)}>
                    <i class="fa-solid fa-plus"></i>
                    New Notebook
                </button>
            </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateNotebook />
                    </Modal>
                )} */}
            <div className='homepaga-main-container'>
                <SideNavBar />
                <div>
                    <h1 className='welcome'>Welcome {sessionUser.username}</h1>
                    <div>
                        <HomeNotesView notes={notes} />
                    </div>
                </div>
                <div>
                    <div>
                        <HomeNoteooksView notebooks={{notebooks}}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Homepage;
