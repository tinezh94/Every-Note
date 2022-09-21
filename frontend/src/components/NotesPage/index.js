import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNotesThunk } from "../../store/notes";
import AddNewNoteModal from "../AddNewNoteModal";
import EditNoteModal from '../EditNoteModal';
import DeleteNoteModal from '../DeleteNoteModal';
import SideNavBar from "../SideNavBar";
import './NotesPage.css';
import AddNewNote from "../AddNewNote";

const NotesListingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ selectedNote, setSelectedNote ] = useState(null);

    const sessionUser = useSelector(state => state.session?.user);
    if (!sessionUser) history.push('/');

    const notesSelector = useSelector(state => state?.notes);
    const notesArr = Object.values(notesSelector);

    useEffect(() => {
        dispatch(getNotesThunk(sessionUser?.id));
    }, [dispatch]);


//    console.log('selected note', selectedNote?.title, selectedNote?.content)

    return (
        <>
            <div className="notes-page-container">
                <SideNavBar />
                <div className="notes-container">
                    {/* <AddNewNoteModal  /> */}
                    <div className="all-notes-container">
                        <div className="all-notes-h3-div">
                            <i className="fa-regular fa-note-sticky"></i>
                            <h3 className="all-notes-h3">Notes</h3>
                        </div>
                        <div>
                            <p className="all-notes-length">{notesArr.length} notes</p>
                        </div>
                        <div className="all-notes-notes">
                            {notesSelector && notesArr.map(note => (
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
            </div>
        </>
    )
}

export default NotesListingPage;
