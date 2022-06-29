import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebookNotesThunk } from '../../store/notebooks';
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

    console.log(note)

    // useEffect(() => {
    //     const errors =[];

    //     if (notesArr.map(note => note.title).includes(editTitle)) errors.push("Note title must be unique");
    //     setValidationErrors(errors);
    // },[editTitle]);

    const editSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            id: note.id,
            editTitle,
            editContent,
            userId: sessionUser.id,
            notebookId: id
        }

        let edittedNote = await dispatch(editNoteThunk(payload));
        // await dispatch(getNotebookNotesThunk(id));
        if (edittedNote) reset();
        setHasSubmitted(false);
        hideForm();
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
                    type='text'
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                    placeholder='Note...'
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}>

                </textarea>
                <button type="submit">Update</button>
                <button type="button" onClick={editCancel}>Cancel</button>
            </form>
        </>
    )
};

export default EditNoteForm;
