import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNotebooksThunk, getOneNotebookThunk, getNotebookNotesThunk } from '../../store/notebooks';
import EditNotebook from '../EditNotebookModal/EditNotebook';
import AddNewNote from '../AddNewNote';

const NotebobookDetailPage = ( { sessionUser }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // console.log(id)
    // const currentSessionId = sessionUser.id;
    // console.log(notebook)
    const allNotebooks = useSelector(state => state.notebooks);
    const notebook = allNotebooks[id];

    // const [ loaded, setLoaded ] = useState(false);
    useEffect(() => {
        dispatch(getNotebooksThunk(sessionUser.id));
        dispatch(getOneNotebookThunk(id));
        dispatch(getNotebookNotesThunk(id));
    }, [dispatch]);

    console.log(notebook)
    // setLoaded(true);
    // let notes = Object.values(notebook)
    // console.log(notes)
    // if (loaded) {
    return (
        <>
            <button>New Note</button>
            {/* <AddNewNote notebook={notebook} /> */}
          {notebook && (
            <div>
                <h1>{notebook.name}</h1>
                {notebook.Notes && notebook.Notes.map(note => (
                    <div>
                        <h4>{note.title}</h4>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
            )}
        </>
    )
                // }
}

export default NotebobookDetailPage;
