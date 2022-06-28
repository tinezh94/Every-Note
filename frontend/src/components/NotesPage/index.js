import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotesThunk } from "../../store/notes";
import AddNewNote from "../AddNewNote";

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
    }, [sessionUser.id]);

    useEffect(() => {
        setNotes(notesSelector);
    }, [notes]);

    return (
        <>
            {notesSelector && notesArr.map(note => (
                <div key={note.id}>
                    <h3>Note Title: {note.title}</h3>
                    <p>Note Content: {note.content}</p>
                    <AddNewNote />
                </div>
            ))}
        </>
    )


}

export default NotesListingPage;
