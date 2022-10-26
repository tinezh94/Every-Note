import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import { getNotebookNotesThunk } from '../../store/notebooks';
import { createNoteThunk, getNotebookNotesThunk } from '../../store/notes';

const AddNeNoteForm = ({hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const notesSelector = useSelector(state => state.notes);

    const notesArr = Object.values(notesSelector)

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ notes, setNotes ] = useState('');

    useEffect(() => {
        const errors =[];

        if (!title) errors.push("Note title cannot be empty");
        setValidationErrors(errors);
    },[title]);

    useEffect(() => {
        // setNotes(notesSelector)
        dispatch(getNotebookNotesThunk(id))
    }, [dispatch, notesSelector]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) alert('Cannot Add Note');

        const payload = {
            title,
            content,
            userId: sessionUser?.id,
            notebookId: id || 1
        }

        let createdNote = await dispatch(createNoteThunk(payload));
        // await dispatch(getNotebookNotesThunk(id));
        if (createdNote) reset();
        setHasSubmitted(false);
        hideForm();
        // history.push(`/notebooks/notebook/${id}`);
    }

    const reset = () => {
        setTitle('');
        setContent('');
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
                <input
                    className='add-new-note-title'
                    placeholder='Title...'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className='add-new-note-text'
                    placeholder="Starting writing here..."
                    rows="10"
                    cols="50"
                    value={content}
                    onChange={e => setContent(e.target.value)}>

                </textarea>
                <div className='save-new-note-div'>
                    <button className='save-new-note' type="submit">Save Note</button>
                </div>
            </form>
        </>
    )

};

export default AddNeNoteForm;
