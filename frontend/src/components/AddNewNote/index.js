import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getNotebookNotesThunk } from '../../store/notebooks';
import { createNoteThunk, deleteNoteThunk, editNoteThunk } from '../../store/notes';

import ReactHtmlParser from 'react-html-parser';
// import TextEditor from './richTextEditor';
import "react-quill/dist/quill.snow.css";
import Editor from './richTextEditor'

const AddNewNote = () => {
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
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    const notebook = useSelector(state => state.notebooks.notebook);
    const notesSelector = useSelector(state => state.notes);
    const notesArr = Object.values(notesSelector);

    // console.log(notesArr)

    useEffect(() => {
        setNotes(notesSelector)
    }, [notes]);

    useEffect(() => {}, [oldNote, oldNoteContent, oldTitle, notebook]);

    const reset = () => {
        setNewTitle('');
        setNewNoteContent('');
        setOldNoteContent('');
        setOldTitle('');
        setNewNote(true);
    };

    const onSubmit = async (e, noteId) => {
        e.preventDefault();
        setHasSubmitted(true);

            const payload = {
                id: notesArr.length + 1,
                title: newTitle,
                content: newNoteContent,
                userId: sessionUser.id,
                notebookId: id,
            };

            let createdNote = dispatch(createNoteThunk(payload))
                .then(dispatch(getNotebookNotesThunk(id)))
                .then(reset());
            // setOldNote(createdNote);
            setHasSubmitted(false);
    }

    const editNote = async (e) => {
        e.preventDefault();
            const payload = {

            };

        await dispatch(editNoteThunk(payload))
    }

    const submitDelete = (e, noteId) => {
        e.preventDefault();

        dispatch(deleteNoteThunk(noteId))
            .then(dispatch(getNotebookNotesThunk(id)))
            .then(reset());
    }

    return (
        <>
          <div>
            <button type='submit' form="noteform" onClick={(e) => onSubmit(e, oldNote.id)}>Save</button>
            {oldNote.id ? (
                <button onClick={(e) => submitDelete(e, oldNote?.id)}>Delete</button>
            ) :  <button>Delete</button>
            }
          </div>
          {notesArr.map(note => {
            //   <button onClick={(e) => submitDelete(e, oldNote?.id)}>Delete</button>
            if (oldNote.id === note.id) {
                return (
                    <div>
                        <div
                            key={note.id}
                            onClick={() => {
                                setNewNote(false);
                                setOldTitle(note.title);
                                setOldNoteContent(note.content);
                                setOldNote(note);
                            }}>
                            <div>
                                <h2
                                onClick={() => {
                                    setNewNote(false);
                                    setOldTitle(note.title);
                                    setOldNoteContent(note.content);
                                    setOldNote(note);
                                }}>{note.title}
                                </h2>
                                <p>
                                {/* {" "}
                                {ReactHtmlParser(note.content)} */}
                                {Editor.on('text-change', () => {
                                    let delta = Editor.getContents();
                                    return JSON.stringify(delta)
                                } )}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        key={note.id}
                        onClick={() => {
                            setNewNote(false);
                            setOldTitle(note.title);
                            setOldNoteContent(note.content);
                            setOldNote(note);
                        }}>
                        <div>
                            <h2
                              onClick={() => {
                                setNewNote(false);
                                setOldTitle(note.title);
                                setOldNoteContent(note.content);
                                setOldNote(note);
                              }}>
                            {note.title}
                            </h2>
                            <p>
                              {ReactHtmlParser(note.content)}
                            </p>
                        </div>
                    </div>
                )
            };
        })};

            <div>
                <form id="noteform" onSubmit={onSubmit}>
                    <input
                    type="text"
                    value={newTitle ? newTitle : oldTitle}
                    onChange={newNote ? (e) => setNewTitle(e.target.value) : (e) => setOldTitle(e.target.value)}
                    />
                </form>
                <Editor
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
