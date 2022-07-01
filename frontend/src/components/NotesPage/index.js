import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotesThunk } from "../../store/notes";
import AddNewNoteModal from "../AddNewNoteModal";
import EditNoteModal from '../EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';
import SideNavBar from "../SideNavBar";
import './NotesPage.css';

const NotesListingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ notes, setNotes ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push('/');

    const notesSelector = useSelector(state => state.notes);
    const notesArr = Object.values(notesSelector);

    useEffect(() => {
        dispatch(getNotesThunk(sessionUser.id));
    }, [dispatch, sessionUser.id]);

    useEffect(() => {
        setNotes(notesSelector);
    }, [notesSelector, notes]);  //?????

    return (
        <>
            <div className="notes-page-container">
                <SideNavBar />
                <div className="notes-container">
                    <AddNewNoteModal  />
                    <div className="all-notes-container">
                        {notesSelector && notesArr.map(note => (
                            <div className="one-note-container" key={note.id}>
                                <h3 className="one-note-title">{note.title}</h3>
                                <p className="one-note-content">{note.content}</p>
                                <EditNoteModal note={note} />
                                <DeleteNoteModal note={note} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesListingPage;
