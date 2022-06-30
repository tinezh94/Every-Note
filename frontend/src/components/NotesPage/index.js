import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotesThunk } from "../../store/notes";
import AddNewNoteModal from "../AddNewNoteModal";
import EditNoteModal from '../EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';

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
            <AddNewNoteModal  />
            {notesSelector && notesArr.map(note => (
                <div key={note.id}>
                    <h3>Note Title: {note.title}</h3>
                    <p>Note Content: {note.content}</p>
                    <EditNoteModal note={note} />
                    <DeleteNoteModal note={note} />
                </div>
            ))}
        </>
    )


}

export default NotesListingPage;
