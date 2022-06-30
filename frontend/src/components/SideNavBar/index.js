import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useHistory, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as SessionActions from '../../store/session';
import { getNotebooksThunk } from "../../store/notebooks";
import './SideNavBar.css';

const SideNavBar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);
    const notebooksArr = Object.values(notebooks);
    console.log(notebooksArr.length)

    const [ showNotebooksCon, setShowNotebooksCon ] = useState(false);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    }, [dispatch, sessionUser.id]);


    const logout = (e) => {
        e.preventDefault();
        dispatch(SessionActions.logout());
        Redirect('/');
    };

    return (
        <>
            <div className="sideNavBar-container">
                <div>
                    {sessionUser.username}
                </div>
                <div>
                    <h4 onClick={logout}>Log Out</h4>
                </div>
                <div>
                    <h3>
                        <NavLink to='/home'>Home</NavLink>
                    </h3>
                </div>
                <div>
                    <h3>
                        <NavLink to='/notes'>Notes</NavLink>
                    </h3>
                </div>
                <div>
                    <h3 onClick={() => setShowNotebooksCon(!showNotebooksCon)}>
                        Notebooks
                    </h3>
                            {showNotebooksCon &&
                                notebooksArr.length > 0 && notebooksArr.map(notebook => (
                                <ul>
                                    <NavLink
                                    key={notebook.id}
                                    to={`/notebooks/notebook/${notebook.id}`}>
                                    <li>{notebook.name}</li>
                                    </NavLink>
                                 </ul>
                                ))
                            }
                </div>
                <div>
                </div>
            </div>

        </>
    )

};

export default SideNavBar;
