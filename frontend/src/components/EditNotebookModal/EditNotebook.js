import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebooksThunk, updateNotebookThunk } from '../../store/notebooks';

const EditNotebook = ({ notebook, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const { notebookId } = useParams();
    const [ editName, setEditName ] = useState(notebook?.name);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks);


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

        let editedNotebook = await dispatch(updateNotebookThunk(payload));

        setHasSubmitted(false);
        hideForm();
        // history.push(`/notebooks/notebook/${editedNotebook.id}`);
    }

    const editNotebookCancel = (e) => {
        e.preventDefault();
        setValidationErrors({});
        hideForm();
        history.push(`/notebooks/notebook/${notebook.id}`);
    }
    return (
        <>
            <h3 className='edit-notebook-h3'>Rename notebook</h3>
            <form onSubmit={editNotebookOnSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul className='new-notebook-error-div'>
                            {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    )}
                <label className='edit-notebook-label'>Name</label>
                <input
                className='edit-notebook-input'
                type='text'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                />
                <div className='edit-notebook-actions-div'>
                    <button className='edit-notebook-btn' type="submit">Continue</button>
                    <button className='cancel-notebook-btn' type="button" onClick={editNotebookCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default EditNotebook;
