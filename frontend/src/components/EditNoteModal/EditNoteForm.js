import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebookNotesThunk, getNotesThunk } from '../../store/notes';
import { editNoteThunk } from '../../store/notes';

const EditNoteForm = ({ note, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [ editTitle, setEditTitle ] = useState(note.title);
    const [ editContent ,setEditContent ] = useState(note.content);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const notesSelector = useSelector(state => state.notes);
    const notesArr = Object.values(notesSelector);

    useEffect(() => {
        if (!id) dispatch(getNotesThunk(sessionUser.id))
        else dispatch(getNotebookNotesThunk(id))
    }, [dispatch, note]);

    // useEffect(() => {
    //     setNote(editNote)
    // }, [dispatch, editNote])

    const handleChange = e => {
        setEditContent(e.target.value);

    };

    const editSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            id: note.id,
            title: editTitle,
            content: editContent,
            userId: sessionUser.id,
            notebookId: id || note.notebookId || 1
        }

        let edittedNote = await dispatch(editNoteThunk(payload));
        // await dispatch(getNotebookNotesThunk(id));
        if (edittedNote) reset();
        setHasSubmitted(false);
        hideForm();
        // history.push(`/notebooks/notebook/${id}`)
    }

    const reset = () => {
        setEditTitle('');
        setEditContent('');
    };

    const editCancel = (e) => {
        e.preventDefault();
        // setValidationErrors({});
        hideForm();
    }

    return (
        <>
            <form onSubmit={editSubmit}>
                {/* {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )} */}
                <input
                    className='edit-note-title'
                    type='text'
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                    className='edit-note-text'
                    placeholder='Start writing here...'
                    cols="50"
                    rows="10"
                    value={editContent}
                    onChange={handleChange}>

                </textarea>
                <div className='edit-note-actions-div'>
                    <button className='update-note-btn'  onClick={editSubmit} type="submit">Update</button>
                    <button className='cancel-edit-note-btn' type="button" onClick={editCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
};

export default EditNoteForm;
