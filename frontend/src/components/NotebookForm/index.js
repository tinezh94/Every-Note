import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { deleteNotebookThunk, getNotebooksThunk } from '../../store/noteboooks';
import EditNotebook from '../Homepage/EditNotebook';

const NotebookForm = () => {
    const { notebookId } = useParams();
    const [ notebooks, setNotebooks ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const notebooksSelector = useSelector(state => state.notebooks);
    const sessionUser = useSelector(state => state.session.user)

    const notebooksArr = Object.values(notebooksSelector);

    const onDelete = (e, notebookId) => {
        e.preventDefault();
        dispatch(deleteNotebookThunk(notebookId));
        history.push('/home');
    }


    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    },[sessionUser.id]);

    // useEffect(() => {
    //     if (notebooksSelector) {
    //         setNotebooks(Object.values(notebooksSelector));
    //     }
    // }, [notebooksSelector]);

return (
    <>
      <div>
        <button onClick={() => setShowModal(true)}>Rename Notebook</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditNotebook />
        </Modal>
      )}
      {notebooksSelector && notebooksArr.map(notebook => (
        <div key={notebook.id}>
            <h4>Notebook Id: {notebook.id}</h4>
            <h4>Notebook Name: {notebook.name}</h4>
            <button onClick={(e) => onDelete(e, notebook.id)}>Delete Notebook</button>
        </div>
      ))}
    </>
    )
}

export default NotebookForm;
