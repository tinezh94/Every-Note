import { useState, useEffect, React, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNoteThunk, getNotebookNotesThunk, editNoteThunk, getNotesThunk } from '../../store/notes';

import DeleteNoteModal from '../DeleteNoteModal';

// import ReactHtmlParser from 'react-html-parser';
// import TextEditor from './richTextEditor';
// import { useQuill } from 'react-quilljs';
// import 'quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import styled from "styled-components";
import ReactHtmlParser from 'html-react-parser';

// import Editor from './richTextEditor'

// const AddNewNote = () => {
//     const { quill, quillRef } = useQuill();
//     const [ content, setContent ] = useState('');

//     useEffect(() => {
//         if (quill) {
//           quill.on('text-change', () => {
//             setContent(quillRef.current.firstChild.innerHTML);
//           });
//         }
//       }, [quill]);

//     // console.log('this is editor value', content)

//     return (
//         <div>
//             <h2>Hi!</h2>
//             <div style={{ width: 500, height: 300 }}>
//                 <div ref={quillRef} />
//             </div>
//         </div>
//     );
      
// };

const AddNewNote = ({ note }) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { id } = useParams();

    const Delta = Quill.import('delta');
    const reactQuillRef = useRef(null);

    const sessionUser = useSelector(state => state.session.user);
    const notesSelector = useSelector(state => state.notes);

    // console.log('selecteddd', note)
    
    const [ title, setTitle ] = useState('');
    const [ content, setContent] = useState('');
    const [ newNote, setNewNote ] = useState(true);
    const [ editTitle, setEditTitle ] = useState(note?.title);
    const [ editContent, setEditContent ] = useState(note?.content); 
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    // console.log('edittitle', editTitle, note?.title)
    // console.log('edittitle', editContent, note?.content)

    // console.log('new note?', newNote)

    useEffect(() => {
        const errors =[];

        if (!title && !editTitle) errors.push("Note title cannot be empty");
        if (title?.length > 25 || editTitle?.length > 25) errors.push('Title is too long');
        if (content?.length > 1000 || editContent?.length > 1000) errors.push('Please divide up the content in separate notes');
        setValidationErrors(errors);
    },[title, content, editTitle, editContent]);

    useEffect(() => {
        if (note) {
            setNewNote(false);
        }
        setEditTitle(note?.title);
        setEditContent(note?.content);
    }, [note, note?.title, note?.content]);

    
    // useEffect(() => {
    //     // setNotes(notesSelector)
    //     dispatch(getNotebookNotesThunk(id))
    //     dispatch(getNotesThunk(sessionUser.id));
    // }, [dispatch]);


    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) alert('Cannot Add Note');

        const payload = {
            // title: title ? title : editTitle,
            // content: content ? content : editContent,
            title,
            content,
            userId: sessionUser.id,
            notebookId: id || 1
        }

        console.log('content', payload);

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
            userId: sessionUser.id,
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
            <form onSubmit={newNote ? onSubmit : editSubmit} className='add-new-note-form'>
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
                            ref={reactQuillRef}
                            theme='bubble' 
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
                            ref={reactQuillRef}
                            theme='bubble' 
                            modules={modules}
                            placeholder='Start writing something here...'
                            value={editContent}
                            onChange={setEditContent}
                        />
                    </EditerContainer>
                )} 
            </form>
        </div>
    )
}


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
        width: 406px;
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

      
export default AddNewNote;

//     // const notebookId = notebook.id;
//     // console.log(notebookId)
//     const { id } = useParams();

//     const dispatch = useDispatch();
//     const [ notes, setNotes ] = useState([]);
//     const [ newTitle, setNewTitle ] = useState('');
//     const [ newNoteContent, setNewNoteContent ] = useState('');
//     const [ newNote, setNewNote ] = useState(true);
//     const [ oldNote, setOldNote ] = useState('');
//     const [ oldTitle, setOldTitle ] = useState('')
//     const [ oldNoteContent, setOldNoteContent ] = useState('');
//     const [ hasSubmitted, setHasSubmitted ] = useState(false);
//     const [ validationErrors, setValidationErrors ] = useState([]);

//     const sessionUser = useSelector(state => state.session.user);
//     const notebook = useSelector(state => state.notebooks.notebook);
//     const notesSelector = useSelector(state => state.notes);
//     const notesArr = Object.values(notesSelector);

//     // console.log(notesArr)

//     useEffect(() => {
//         setNotes(notesSelector)
//     }, [notes]);

//     useEffect(() => {}, [oldNote, oldNoteContent, oldTitle, notebook]);

//     const reset = () => {
//         setNewTitle('');
//         setNewNoteContent('');
//         setOldNoteContent('');
//         setOldTitle('');
//         setNewNote(true);
//     };

//     const onSubmit = async (e, noteId) => {
//         e.preventDefault();
//         setHasSubmitted(true);

//             const payload = {
//                 id: notesArr.length + 1,
//                 title: newTitle,
//                 content: newNoteContent,
//                 userId: sessionUser.id,
//                 notebookId: id,
//             };

//             let createdNote = dispatch(createNoteThunk(payload))
//                 .then(dispatch(getNotebookNotesThunk(id)))
//                 .then(reset());
//             // setOldNote(createdNote);
//             setHasSubmitted(false);
//     }

//     const editNote = async (e) => {
//         e.preventDefault();
//             const payload = {

//             };

//         await dispatch(editNoteThunk(payload))
//     }

//     const submitDelete = (e, noteId) => {
//         e.preventDefault();

//         dispatch(deleteNoteThunk(noteId))
//             .then(dispatch(getNotebookNotesThunk(id)))
//             .then(reset());
//     }

//     return (
//         <>
//           <div>
//             <button type='submit' form="noteform" onClick={(e) => onSubmit(e, oldNote.id)}>Save</button>
//             {oldNote.id ? (
//                 <button onClick={(e) => submitDelete(e, oldNote?.id)}>Delete</button>
//             ) :  <button>Delete</button>
//             }
//           </div>
//           {notesArr.map(note => {
//             //   <button onClick={(e) => submitDelete(e, oldNote?.id)}>Delete</button>
//             if (oldNote.id === note.id) {
//                 return (
//                     <div>
//                         <div
//                             key={note.id}
//                             onClick={() => {
//                                 setNewNote(false);
//                                 setOldTitle(note.title);
//                                 setOldNoteContent(note.content);
//                                 setOldNote(note);
//                             }}>
//                             <div>
//                                 <h2
//                                 onClick={() => {
//                                     setNewNote(false);
//                                     setOldTitle(note.title);
//                                     setOldNoteContent(note.content);
//                                     setOldNote(note);
//                                 }}>{note.title}
//                                 </h2>
//                                 <p>
//                                 {/* {" "}
                                // {ReactHtmlParser(note.content)} */}
                                // {Editor.on('text-change', () => {
                                //     let delta = Editor.getContents();
                                //     return JSON.stringify(delta)
                                // } )}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             } else {
//                 return (
//                     <div
//                         key={note.id}
//                         onClick={() => {
//                             setNewNote(false);
//                             setOldTitle(note.title);
//                             setOldNoteContent(note.content);
//                             setOldNote(note);
//                         }}>
//                         <div>
//                             <h2
//                               onClick={() => {
//                                 setNewNote(false);
//                                 setOldTitle(note.title);
//                                 setOldNoteContent(note.content);
//                                 setOldNote(note);
//                               }}>
//                             {note.title}
//                             </h2>
//                             <p>
//                               {ReactHtmlParser(note.content)}
//                             </p>
//                         </div>
//                     </div>
//                 )
//             };
//         })};

//             <div>
//                 <form id="noteform" onSubmit={onSubmit}>
//                     <input
//                     type="text"
//                     value={newTitle ? newTitle : oldTitle}
//                     onChange={newNote ? (e) => setNewTitle(e.target.value) : (e) => setOldTitle(e.target.value)}
//                     />
//                 </form>
//                 <Editor
//                     newNote={newNote}
//                     oldNoteContent={oldNoteContent}
//                     newNoteontent={newNoteContent}
//                     setOldNoteContent={setOldNoteContent}
//                     setNewNoteContent={setNewNoteContent} />
//             </div>
//         </>
//     )
// };

