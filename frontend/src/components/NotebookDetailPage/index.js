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
            <AddNewNoteModal />

          {notebook && notesArr && (
              <div>
                <h1>{notebook.name}</h1>
                {notesArr && notesArr.map(note => (
                    <div>
                        <h4 key={note.title}>{note.title}</h4>
                        <p key={note.content}>{note.content}</p>
                        <EditNoteModal note={note} />
                        <DeleteNoteModal note={note} />
                    </div>
                ))}
            </div>
            )}
        </>
    )
                // }
}

export default NotebobookDetailPage;
