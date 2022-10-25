import { useState, useEffect, React, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNoteThunk, getNotebookNotesThunk, editNoteThunk, getNotesThunk } from '../../store/notes';
import DeleteNoteModal from '../DeleteNoteModal';
import AddNewNote from '../AddNewNote';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import SideNavBar from '../SideNavBar';

const NotebookPage = ({ allNotebooks }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    // const notebooks = useSelector(state => state.notebooks);
    const notebooksArr = allNotebooks ? Object.values(allNotebooks) : null;
    const oneNotebook = notebooksArr?.filter(nb => {
        return nb.id === Number(id);
    });
    const notes = useSelector(state => state.notes);
    const notesArr = notes ? Object.values(notes) : null;
    // const oneNote = notesArr?.filter(note => {
    //     return note?.id === Number(id)
    // });
    let notebook = oneNotebook[0];
    // let note = oneNote[0];

    if (!sessionUser) history.push('/');
    const [ selectedNote, setSelectedNote ] = useState(null);

    // const [ title, setTitle ] = useState('');
    // const [ content, setContent] = useState('');
    // const [ newNote, setNewNote ] = useState(true);
    // const [ editTitle, setEditTitle ] = useState(note?.title);
    // const [ editContent, setEditContent ] = useState(note?.content); 
    // const [ hasSubmitted, setHasSubmitted ] = useState(false);
    // const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        dispatch(getNotesThunk(sessionUser?.id));
    }, [dispatch]);

    return (
        <div className='notebook-notes-container'>
            <SideNavBar />
            <div className="notes-container">
                    {/* <AddNewNoteModal  /> */}
                <div className="all-notes-container">
                    <div className='notebook-pg-notebook-container'>
                        <i className="fa-solid fa-book"></i>
                        <h3 className='notebook-pg-nb-name'>{notebook?.name}</h3>
                    </div>
                    <div>
                        <p className="all-notes-length">{notesArr.length} notes</p>
                    </div>
                    <div className="all-notes-notes">
                        {notes && notesArr.reverse().map(note => (
                            <div className="one-note-container" id='one-note-div' key={note?.id} onClick={e => {setSelectedNote(note)}}>
                                <h3 className="one-note-title">{note.title}</h3>
                                <p className="one-note-content" dangerouslySetInnerHTML={{__html: note.content}}></p>
                                {/* <EditNoteModal note={note} />
                                <DeleteNoteModal note={note} /> */}
                            </div>
                        ))}
                    </div>
                </div>
                <AddNewNote note={selectedNote} /> 
            </div>
            {/* <div className='note-pg-note-container'>
                <form onSubmit={newNote ? onSubmit : editSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                <div className='notebook-pg-top-container'>
                    <div className='notebook-pg-notebook-container'>
                        <i className="fa-solid fa-book"></i>
                        <h3>{notebook.name}</h3>
                    </div>
                    <div className='save-new-note-div'>
                        <button className='save-new-note' type="submit">Save</button>
                        <DeleteNoteModal note={note} />
                    </div>
                </div>
                {newNote && (
                    <EditerContainer>
                        <div className='add-new-note-title-div'>
                            <input 
                            className='add-new-note-title'
                            id='new-note-title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Title' 
                            />
                        </div>
                        <ReactQuill 
                            id='quill-editor'
                            // ref={reactQuillRef}
                            theme='snow' 
                            modules={modules}
                            placeholder='Start writing something here...'
                            // defaultValue={selectedContent ? selectedContent : ''}
                            value={content}
                            onChange={setContent}
                        />
                    </EditerContainer>
                )}
                {!newNote && (
                    <EditerContainer>
                        <div className='add-new-note-title-div'>
                            <input 
                            className='add-new-note-title'
                            id='new-note-title'
                            type='text'
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            placeholder='Title' 
                            />
                            <div className='note-updated-at-div'>
                                <p>Last edited on {toDate(note?.updatedAt)}</p>
                            </div>
                        </div>
                        <ReactQuill 
                            id='quill-editor'
                            // ref={reactQuillRef}
                            theme='snow' 
                            modules={modules}
                            placeholder='Start writing something here...'
                            value={editContent}
                            onChange={setEditContent}
                        />
                    </EditerContainer>
                )} 
                </form> */}
            {/* </div> */}
        </div>
    )
};

const EditerContainer = styled.div`
    width: 100%;
    > input {
        border: none;
        padding: 10px;
        font-size: 20px;
        width: 100%;
    }

    .ql-toolbar,
    .ql-container {
        border: none !important;
        padding-left: 22px;
    }

    .ql-toolbar {
        color: #A6A6A6;
    }

    .quill,
    .ql-container {
        min-height: 100%;
        width: 96%;
    }

    .ql-container {
        // margin-left: 22px;
    }

    .quill > .ql-container > .ql-editor.ql-blank::before{
        font-size: 14px;
        color: #a6a6a6;
        margin-left: 22px;
    }

    .ql-editor p {
        color: white;
        font-size: 14px;
    }
    
    .ql-editor {
        word-break: break-word;
        // height: 100vh;
        width: 220%;
    }

`

export default NotebookPage;