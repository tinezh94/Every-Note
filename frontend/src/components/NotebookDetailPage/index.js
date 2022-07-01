import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNotebooksThunk, getOneNotebookThunk } from '../../store/notebooks';
import EditNotebook from '../EditNotebookModal/EditNotebook';
// import AddNewNote from '../AddNewNote';
import AddNewNoteModal from '../AddNewNoteModal';
import EditNoteModal from '../EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';
import { getNotebookNotesThunk } from '../../store/notes';
import SideNavBar from '../SideNavBar';
// import './NotebookDetail.css';
import '../NotesPage/NotesPage.css';

const NotebobookDetailPage = ( { sessionUser }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // console.log(id)
    // const currentSessionId = sessionUser.id;
    // console.log(notebook)
    const [ oldNote, setOldNote ] = useState('');
    const [ readNote, setReadNote ] = useState(true);

    const allNotebooks = useSelector(state => state.notebooks);
    const notebook = allNotebooks[id];

    // const notesSelector = useSelector(state => state.notes);
    // const notesArr = Object.values(notesSelector);
    // console.log(notesArr)

    const notes = useSelector(state => state.notes);
    const notesArr = Object.values(notes);
    // const [ loaded, setLoaded ] = useState(false);
    useEffect(() => {
        dispatch(getOneNotebookThunk(id));
        dispatch(getNotebooksThunk(sessionUser.id));
        dispatch(getNotebookNotesThunk(id));
    }, [dispatch]);



    // dispatch(getNotebookNotesThunk(id));
    console.log(notebook)
    // setLoaded(true);
    // let notes = Object.values(notebook)
    // console.log(notes)
    // if (loaded) {



    return (
        <>
            <div className='notebook-detail-page-container'>
                <SideNavBar />
                <div className='notes-container'>
                    <AddNewNoteModal />
                    <div>
                        {notebook && notesArr && (
                            <div>
                                <h1 className='notebook-name-h1'>{notebook.name}</h1>
                                {notesArr && notesArr.map(note => (
                                    <div className='notebook-notes-container'>
                                        <div className='one-note-container'>
                                            <h4 className='one-note-title' key={note.title}>{note.title}</h4>
                                            <p className='one-note-content' key={note.content}>{note.content}</p>
                                            <EditNoteModal note={note} />
                                            <DeleteNoteModal note={note} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
                    </div>
                </div>
            </div>
         </>
    )
                // }
}

export default NotebobookDetailPage;
