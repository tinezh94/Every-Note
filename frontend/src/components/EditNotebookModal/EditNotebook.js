import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebooksThunk, updateNotebookThunk } from '../../store/notebooks';

const EditNotebook = ({ notebook, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const { notebookId } = useParams();
    const [ editName, setEditName ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks);

    console.log(notebook)


    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
    },[dispatch]);

    useEffect(() => {
        let errors = [];

        if (editName.length > 50) errors.push('Notebook name cannot be longer than 50 characters');
        if (editName.length < 1) errors.push('Notebook name cannot be empty');
        setValidationErrors(errors);
    }, [editName]);

    const editNotebookOnSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            id: notebook.id,
            name: editName,
            userId: sessionUser.id,
        }
        console.log(payload)
        let editedNotebook = await dispatch(updateNotebookThunk(payload));
        console.log(editedNotebook)
        setHasSubmitted(false);
        hideForm();
        history.push(`/notebooks/${notebook.id}`);
    }

    const editNotebookCancel = (e) => {
        e.preventDefault();
        setValidationErrors({});
        hideForm();
        history.push(`/notebooks/${notebook.id}`);
    }
    return (
        <>
            <form onSubmit={editNotebookOnSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    )}
                <label>Name</label>
                <input
                type='text'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                />
                <button type="submit">Continue</button>
                <button type="button" onClick={editNotebookCancel}>Cancel</button>
            </form>
        </>
    )
}

export default EditNotebook;