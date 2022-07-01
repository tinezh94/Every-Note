import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as SessionActions from '../../store/session';
import { getNotebooksThunk } from "../../store/notebooks";
import { Modal } from '../../context/Modal';
import CreateNotebook from '../Homepage/CreateNotebook';
import './SideNavBar.css';

const SideNavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const notebooksArr = Object.values(notebooks);
    console.log(notebooksArr.length)

    const [ showNotebooksCon, setShowNotebooksCon ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    }, [dispatch, sessionUser.id]);


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
                    {sessionUser.username}
                </div>

                <div>
                <button className='add-notebook' onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                    New Notebook
                </button>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateNotebook />
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
                            <i class="fa-solid fa-note-sticky"></i>
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
