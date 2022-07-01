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
    console.log(notesSelector)
    const notesArr = Object.values(notesSelector)

    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ notes, setNotes ] = useState('');

    useEffect(() => {
        const errors =[];

        if (notesArr.map(note => note.title).includes(title)) errors.push("Note title must be unique");
        setValidationErrors(errors);
    },[title]);

    useEffect(() => {
        setNotes(notesSelector)
        // dispatch(getNotebookNotesThunk(id))
    }, [dispatch, notesSelector]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) alert('Cannot Add Note');

        const payload = {
            title,
            content,
            userId: sessionUser.id,
            notebookId: id || 1
        }
        console.log("THIS IS PAY LOAD", payload)
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
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Starting writing here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}>

                </textarea>
                <button type="submit">Save Note</button>
            </form>
        </>
    )

};

export default AddNeNoteForm;
