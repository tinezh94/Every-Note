import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebookNotesThunk } from '../../store/notebooks';
import { createNoteThunk, deleteNoteThunk } from '../../store/notes';
import TextEditor from './richTextEditor';
import "react-quill/dist/quill.snow.css";

const AddNewNote = ({ notebook }) => {
    // const notebookId = notebook.id;
    // console.log(notebookId)
    const { id } = useParams();

    const dispatch = useDispatch();
    const [ notes, setNotes ] = useState([]);
    const [ newTitle, setNewTitle ] = useState('');
    const [ newNoteContent, setNewNoteContent ] = useState('');
    const [ newNote, setNewNote ] = useState(true);
    const [ oldNote, setOldNote ] = useState('');
    const [ oldTitle, setOldTitle ] = useState('')
    const [ oldNoteContent, setOldNoteContent ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const notesSelector = useSelector(state => state.notes);

    useEffect(() => {
        setNotes(notesSelector)
    }, [notes]);


    const reset = () => {
        setNewTitle('');
        setNewNoteContent('');
        setOldNoteContent('');
        setOldTitle('');
        setNewNote(true);
    };

    const onSubmit = async (e, noteId) => {
        e.preventDefault();

        if (newNote) {
            const payload = {
                title: newTitle,
                content: newNoteContent,
                userId: sessionUser.id,
                notebookId: id,
            };

            let createdNote = await dispatch(createNoteThunk(payload));
            // await dispatch(getNotebookNotesThunk(notebookId));
            setOldNote(createdNote);
            if (createdNote) reset();
        }
    }

    const submitDelete = (e, noteId) => {
        e.preventDefault();

        dispatch(deleteNoteThunk(noteId));
        dispatch(getNotebookNotesThunk(id));
        reset();
    }

    return (
        <>
            <div>
                <button type='submit' onClick={(e) => onSubmit(e, oldNote.id)}>Save</button>
                <button onClick={(e) => submitDelete(e, oldNote.id)}>Delete</button>
                <form onSubmit={onSubmit}>
                    <input
                    type="text"
                    value={newTitle ? newTitle : oldTitle}
                    onChange={newNote ? (e) => setNewTitle(e.target.value) : (e) => setOldTitle(e.target.value)}
                    />
                </form>
                <TextEditor
                    newNote={newNote}
                    oldNoteContent={oldNoteContent}
                    newNoteontent={newNoteContent}
                    setOldNoteContent={setOldNoteContent}
                    setNewNoteContent={setNewNoteContent} />
            </div>
        </>
    )
};

export default AddNewNote;
