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
import './NotebookDetail.css';
// import '../NotesPage/NotesPage.css';

const NotebobookDetailPage = ( { sessionUser }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    // const currentSessionId = sessionUser.id;
    // console.log(notebook)
    const [ oldNote, setOldNote ] = useState('');
    const [ readNote, setReadNote ] = useState(true);

    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser?.id));
    },[dispatch]);

    const allNotebooks = useSelector(state => state?.notebooks);

    console.log("IN COMPONENT, ALL NOTEBOOKS", allNotebooks)
    const notebook = allNotebooks[id];

    console.log("COMPONENT, NOTEBOOK", notebook)

    const notes = useSelector(state => state.notes);
    const notesArr = Object.values(notes);
    // const [ loaded, setLoaded ] = useState(false);
    useEffect(() => {
        dispatch(getOneNotebookThunk(id));
        dispatch(getNotebookNotesThunk(id));
    }, [dispatch]);




    return (
        <>
            <div className='notebook-detail-page-container'>
                <SideNavBar />
                <div className='notes-container'>
                        <h1 className='notebook-name-h1'>{notebook?.name}</h1>
                        <AddNewNoteModal />
                        {notebook && notesArr && (
                            <div id='allNotesContainer'>
                                {notesArr && notesArr.map(note => (
                                        <div className='single-note-container'>
                                            <h4 className='single-note-title' key={note.title}>{note.title}</h4>
                                            <div className='single-note-content-div'>
                                                <span id='single-note-content' key={note.content}>{note.content}</span>
                                            </div>
                                            <EditNoteModal note={note} />
                                            <DeleteNoteModal note={note} />
                                        </div>

                                ))}
                            </div>
                            )}
                </div>
            </div>
         </>
    )
                // }
}

export default NotebobookDetailPage;
