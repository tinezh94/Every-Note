import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateNotebookThunk } from '../../store/noteboooks';

const EditNotebook = () => {
    const { notebookId } = useParams();
    const [ editName, setEditName ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const newName = e => setEditName(e.target.value);

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const errors = [];

        if (editName.length > 50) errors.push('Notebook name cannot be longer than 50 characters');
        if (editName.length < 1) errors.push('Notebook name cannot be empty');
        setValidationErrors(errors);
    }, [editName]);

    const editNotebookOnSubmit = (e, notebookId) => {
        e.preventDefault();
        setHasSubmitted(true);
        const payload = {
            editName,
            // userId: sessionUser.id,
        }
        dispatch(updateNotebookThunk(payload, +notebookId));

        history.push('/home');
    }
    return (
        <>
            <form onSubmit={editNotebookOnSubmit}>
                    {hasSubmitted && validationErrors.length > 0 (
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
                onChange={newName}
                />
                <button type="submit">Continue</button>
            </form>
        </>
    )
}

export default EditNotebook;
