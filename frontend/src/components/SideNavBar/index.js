import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as SessionActions from '../../store/session';
import { getNotebooksThunk } from "../../store/notebooks";
import { Modal } from '../../context/Modal';
import CreateNotebook from '../Homepage/CreateNotebook';
import './SideNavBar.css';
import { getNotesThunk } from "../../store/notes";

const SideNavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const notes = useSelector(state => state.notes);
    const notesArr = notes ? Object.values(notes) : null;
    const notebooksArr = Object.values(notebooks);

    const [ showModal, setShowModal ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser?.id));
        dispatch(getNotesThunk(sessionUser?.id));
    }, [dispatch]);

    const submitSearch = () => {
        history.push(`/search/${searchTerm}`)
        setSearchTerm('');
    }


    const logout = (e) => {
        e.preventDefault();
        dispatch(SessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <div className="sideNavBar-container">
                <div className="username">
                    <i className="fa-solid fa-user-check"></i>
                    {sessionUser?.username}
                </div>
                <div>
                    <div className="search-note-div">
                        <button type='submit' className='search-btn' onClick={submitSearch}>
                            <i className="fa-solid fa-magnifying-glass fa-2x"></i>
                        </button>
                        <input 
                            className='search-bar-input'
                            placeholder='Search for notes'
                            type='text'
                            value={searchTerm}
                            onChange={(e) => {openMenu(); setSearchTerm(e.target.value)}}
                        />
                    </div>
                </div>
                {showMenu && (
                    <div className='search-drop-down-div'>
                        <p className="search-go-to">Go to...</p>
                        {searchTerm && notesArr?.filter(note => {
                            if (searchTerm == '') {
                                return note;
                            } else if (note.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return note;
                            } else if (note.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return note;
                            }
                        }).map((note, idx) => (
                            <div key={idx} onClick={() => setSearchTerm('')}>
                                <i className="fa-solid fa-file-lines"></i>
                                <NavLink to={`/notes/note/${note.id}`} className='search-result'>{note.title}</NavLink>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <button className='add-notebook' onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-plus"></i>
                        New Notebook
                    </button>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateNotebook hideForm={() => setShowModal(false)} />
                    </Modal>
                )}
                <div>
                    <h4 className="logout-sidebar" onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Log Out
                    </h4>
                </div>
                <div>
                    <h3>
                        <NavLink className={'home-btn'} to='/home'>
                        <i className="fa-solid fa-house"></i>
                            Home
                        </NavLink>
                    </h3>
                </div>
                <div>
                    <h3>
                        <NavLink className={'notes-btn'} to='/notes'>
                            <i className="fa-solid fa-note-sticky"></i>
                            Notes
                        </NavLink>
                    </h3>
                </div>
                <div>
                    <h3>
                        <NavLink className="notebooks-btn" to='/notebooks'>
                            <i className="fa-solid fa-book"></i>
                                Notebooks
                        </NavLink>
                    </h3>
                    {/* <ul>
                            {showNotebooksCon &&
                                notebooksArr.map(notebook => (
                                    <NavLink
                                    key={notebook.id}
                                    to={`/notebooks/notebook/${notebook.id}`}>
                                    <li className="notebook-list-item">{notebook.name}</li>
                                    </NavLink>
                                ))
                            }
                            </ul> */}
                </div>
                <div>
                </div>
            </div>

        </>
    )

};

export default SideNavBar;
