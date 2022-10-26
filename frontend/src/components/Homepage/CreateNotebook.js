import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNotebookThunk } from '../../store/notebooks';

const CreateNotebook = ({hideForm}) => {

    const [ name, setName ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const newName = e => setName(e.target.value);

    const sessionUser = useSelector(state => state.session.user);
    const notebooksSelector = useSelector(state => state.notebooks);
    console.log(notebooksSelector)
    const notebooksArr = Object.values(notebooksSelector);
    console.log(notebooksArr)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const errors = [];

        if (name.length > 50) errors.push('Notebook name cannot be longer than 50 characters');
        if (name.length < 1) errors.push('Notebook name cannot be empty');
        if (notebooksArr.map(notebook => notebook.name).includes(name)) errors.push('Notebook name must be unique');
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

        if (createdNotebook) reset();
        setHasSubmitted(false);
        hideForm();
        history.push('/notebooks');
    };

    const reset = () => {
        setName('');
    };

    return (
        <>
            <h3 className='create-notebook-h3'>
                Create new notebook
            </h3>
            <h5 className='create-notebook-h5'>Notebooks are useful for grouping notes around a common topic.</h5>
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
                placeholder='Notebook name'
                />
                <div className='create-notebook-btn-div'>
                    <button className='create-notebook-btn' type="submit">Create Notebook</button>
                </div>
            </form>
        </>
    )
}

export default CreateNotebook;
