import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { Modal } from '../../context/Modal';
import { deleteNotebookThunk, getNotebooksThunk } from '../../store/notebooks';
import EditNotebookModal from '../EditNotebookModal';

const NotebookForm = () => {
    const { notebookId } = useParams();
    const [ notebooks, setNotebooks ] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) history.push('/');

    const notebooksSelector = useSelector(state => state.notebooks);

    const notebooksArr = Object.values(notebooksSelector);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    },[sessionUser.id]);

    const onDelete = (e, notebookId) => {
        e.preventDefault();
        dispatch(deleteNotebookThunk(notebookId));
        history.push('/home');
    }

    useEffect (() => {
        setNotebooks(notebooksSelector)
    }, [notebooks]);


    // useEffect(() => {
    //     if (notebooksSelector) {
    //         setNotebooks(Object.values(notebooksSelector));
    //     }
    // }, [notebooksSelector]);

return (
    <>
      {notebooksSelector && notebooksArr.map(notebook => (
          <div key={notebook.id}>
            <p>Notebook Id: {notebook?.id}</p>
            <p>Notebook Name: {notebook?.name}</p>
            <EditNotebookModal notebook={notebook} />
            <button onClick={(e) => onDelete(e, notebook.id)}>Delete Notebook</button>
        </div>
      ))}
    </>
    )
}

export default NotebookForm;
