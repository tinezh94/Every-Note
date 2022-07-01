import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNotebookThunk } from '../../store/notebooks';

const CreateNotebook = () => {

    const [ name, setName ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const newName = e => setName(e.target.value);

    const sessionUser = useSelector(state => state.session.user);
    // const notebooksSelector = useSelector(state => state.notebooks);
    // console.log(notebooksSelector)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const errors = [];

        if (name.length > 50) errors.push('Notebook name cannot be longer than 50 characters');
        if (name.length < 1) errors.push('Notebook name cannot be empty');
        setValidationErrors(errors);
    }, [name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) alert ('Cannot submit');

        const payload = {
            name,
            userId: sessionUser.id,
        }

        let createdNotebook = await dispatch(createNotebookThunk(payload));
        console.log({createdNotebook})
        //****** NEEDS DEBUGGGGGGGGG*!!!!!!!!!!!!!!!********* */
        if (createdNotebook) reset();
        setHasSubmitted(false);
        history.push(`/notebooks/notebook/${createdNotebook.id}`);
    };

    const reset = () => {
        setName('');
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    )}
                <label className='create-notebook-label'>Name</label>
                <input
                className='create-notebook-input'
                type='text'
                value={name}
                onChange={newName}
                />
                <div className='create-notebook-btn-div'>
                    <button className='create-notebook-btn' type="submit">Create Notebook</button>
                </div>
            </form>
        </>
    )
}

export default CreateNotebook;
