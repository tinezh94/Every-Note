import { useState, useEffect, React, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNoteThunk, getNotebookNotesThunk, editNoteThunk, getNotesThunk } from '../../store/notes';
import DeleteNoteModal from '../DeleteNoteModal';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import SideNavBar from '../SideNavBar';

const NotePage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const notes = useSelector(state => state.notes);
    const notesArr = notes ? Object.values(notes) : null;
    let oneNote = notesArr?.filter(note => {
        return note?.id === Number(id)
    });

    let note = oneNote[0]
    
    const [ title, setTitle ] = useState('');
    const [ content, setContent] = useState('');
    const [ newNote, setNewNote ] = useState(true);
    const [ editTitle, setEditTitle ] = useState(note?.title);
    const [ editContent, setEditContent ] = useState(note?.content); 
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        dispatch(getNotesThunk());
    }, [dispatch]);

    useEffect(() => {
        const errors =[];

        if (!title) errors.push("Note title cannot be empty");
        setValidationErrors(errors);
    },[title]);

    useEffect(() => {
        if (note) {
            setNewNote(false);
        }
        setEditTitle(note?.title);
        setEditContent(note?.content);
    }, [note, note?.title, note?.content]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) alert('Cannot Add Note');

        const payload = {
            // title: title ? title : editTitle,
            // content: content ? content : editContent,
            title,
            content,
            userId: sessionUser?.id,
            notebookId: id || 1
        }

        console.log('content', content);

        let createdNote = await dispatch(createNoteThunk(payload));
        if (createdNote) reset();
        setHasSubmitted(false);
        setTitle('');
        setContent('');
        // history.push(`/notebooks/notebook/${id}`);
    }

    const editSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        // if (validationErrors.length > 0) alert('Cannot Edit Note');

        const payload = {
            id: note.id,
            title: editTitle,
            content: editContent,
            userId: sessionUser?.id,
            notebookId: id || note.notebookId || 1
        }

        let edittedNote = await dispatch(editNoteThunk(payload));
        // await dispatch(getNotebookNotesThunk(id));
        if (edittedNote) reset();
        setHasSubmitted(false);
        setEditTitle('');
        setEditContent('');
        // hideForm();
        // history.push(`/notebooks/notebook/${id}`)
    }

    const reset = () => {
        setTitle('');
        setContent('');
        setEditTitle('');
        setEditContent('');
    };

    if (title) {
        const ele = document.getElementById('new-note-title');
        ele.style.color = 'white';
    }

    const modules = {
        toolbar: [
          ["bold", "underline", "italic"],
          ["code-block", "blockquote"],
          [{ header: [1, 2, 3, 4, 5] }],
          [{ list: "ordered" }],
          [{ list: "bullet" }]
        ]
    }
    
    
    useEffect(() => {
        setContent(content);
        setTitle(title)
    }, [title, content])

    const toDate = (string) => {
        const date = new Date(string)
        const date1 = date.toDateString().split(' ')
        return date1.slice(1,3).join(' ') + ',' + ' ' + date1.slice(3);
    }

    return (
        <div>
            <SideNavBar />
            <div className='note-pg-note-container'>
                <form onSubmit={newNote ? onSubmit : editSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                <div className='save-new-note-div'>
                    <button className='save-new-note' type="submit">Save</button>
                    <DeleteNoteModal note={note} />
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
                </form>
            </div>
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
        // width: 406px;
        // width: 95%;
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
        width: 82%;
    }

`

export default NotePage;