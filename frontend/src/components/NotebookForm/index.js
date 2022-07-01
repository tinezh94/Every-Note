import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { Modal } from '../../context/Modal';
import { deleteNotebookThunk, getNotebooksThunk } from '../../store/notebooks';
import EditNotebookModal from '../EditNotebookModal';
import SideNavBar from '../SideNavBar';
import './NotebooksPage.css';



const NotebookForm = () => {
    const { notebookId } = useParams();
    const [ notebooks, setNotebooks ] = useState([]);
    const [ showActions, setShowActions ] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) history.push('/');


    const notebooksSelector = useSelector(state => state.notebooks);
    const notebooksArr = Object.values(notebooksSelector);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser?.id));
    },[dispatch, sessionUser.id]);

    const onDelete =  async (e, notebookId) => {
        e.preventDefault();

        await dispatch(deleteNotebookThunk(notebookId));
        history.push('/home');
    }

    // useEffect (() => {
    //     setNotebooks(notebooksSelector)
    // }, [notebooks]);


    // useEffect(() => {
    //     if (notebooksSelector) {
    //         setNotebooks(Object.values(notebooksSelector));
    //     }
    // }, [notebooksSelector]);

    let notebook;
    notebook = notebooksSelector && notebooksArr.map(notebook => (
        <li key={notebook.id}>
            <div>
                <Link id='link' to={`/notebooks/notebook/${notebook.id}`}>{notebook.name}</Link>
            </div>
            <div className='sub-header-by'>{sessionUser.username}</div>
            <div className='sub-header-created'>{notebook.createdAt}</div>
            <div id="notebook-actions-btns" className='sub-header-actions'>
                <EditNotebookModal notebook={notebook} />
                <button className='delete-notebook' onClick={(e) => onDelete(e, notebook.id)}>Delete</button>
            </div>
        </li>
    ))

return (
    <>
        <div className='notebooks-page-container'>
             <SideNavBar />
            <div>
            <h1 className='page-title'>Notebooks</h1>
                 {/* {notebook = notebooksSelector && notebooksArr.map(notebook => (
                    <li key={notebook.id}>
                        <div>
                            <Link to={`/notebooks/notebook/${notebook.id}`}>{notebook.name}</Link>
                        </div>
                        <div>{sessionUser.username}</div>
                        <div>{notebook.createdAt}</div>
                        <div>
                            <EditNotebookModal notebook={notebook} />
                            <button onClick={(e) => onDelete(e, notebook.id)}>Delete Notebook</button>
                        </div>
                    </li>
                ))} */}

                <div className='notebooks-container'>
                    <ul className='notebooks-header'>
                        <li className='sub-headers'>
                            <div className='sub-header-title'>TITLE</div>
                            <div className='sub-header-by'>CREATED BY</div>
                            <div className='sub-header-created'>CREATED AT</div>
                            <div className='sub-header-actions'>ACTIONS</div>
                        </li>
                            {notebook}
                    </ul>
                </div>
            </div>
    </div>
    </>
    )
}

export default NotebookForm;
