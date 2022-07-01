import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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
        dispatch(getNotebooksThunk(sessionUser.id));
    },[dispatch]);

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


return (
    <>
        <div className='notebooks-page-container'>
             <SideNavBar />
            <div>
            <h1 className='page-title'>Notebooks</h1>
                <table>
                {notebooksSelector && notebooksArr.map(notebook => (
                    <div key={notebook.id}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{notebook.name}</td>
                            <td>{sessionUser.username}</td>
                            <td>{notebook.createdAt}</td>
                            {/* <td onClick={() => setShowActions(!showActions)}>Actions</td> */}
                            {/* {showActions && (
                                <> */}
                            <td><EditNotebookModal notebook={notebook} /></td>
                            <td>
                                <button onClick={(e) => onDelete(e, notebook.id)}>Delete Notebook</button>
                            </td>
                                {/* </>
                            )} */}
                        </tr>
                    </tbody>
                    </div>
                ))}
            </table>

                        {/* <p>Notebook Id: {notebook?.id}</p>
                        <p>Notebook Name: {notebook?.name}</p> */}
            </div>
        </div>
    </>
    )
}

export default NotebookForm;
