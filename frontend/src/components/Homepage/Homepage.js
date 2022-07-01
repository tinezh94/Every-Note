import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Modal } from '../../context/Modal';
import { getNotebooksThunk } from '../../store/notebooks';
import { getNotesThunk } from '../../store/notes';
import SideNavBar from '../SideNavBar';
// import CreateNotebook from './CreateNotebook';
import HomeNotebooksView from './HomeNotebooksView';
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
            <SideNavBar />
            <div className='homepaga-main-container'>
                <div className='homepage-title-container'>
                    <h1 className='welcome'>Welcome {sessionUser?.username} !</h1>
                </div>

                <div className='home-note-notebook-container'>
                    <div>
                        <HomeNotesView notes={notes} />
                    </div>
                    <div>
                        <HomeNotebooksView notebooks={notebooks}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Homepage;
