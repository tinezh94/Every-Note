import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createNoteThunk } from "../../store/notes";
import './Homepage.css'

const HomeNotesView = ({ notes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const notesArr = Object.values(notes);
    const user = useSelector(state => state.session.user);

    const [ showMenu, setShowMenu ] = useState(false);

    const toDate = (string) => {
        const date = new Date(string)
        const date1 = date.toDateString().split(' ')
        return date1.slice(1,3).join(' ');
    }

    const createNewNote = async (e) => {
        e.preventDefault();
        
        const payload = {
            title: 'Untitled',
            content: '',
            userId: user?.id,
            notebookId: 1
        };

        let createdNote = await dispatch(createNoteThunk(payload));
        if (createdNote) {
            history.push('/notes')
        };
    };

    return (
        <div className="home-view-notes-div">
            <div className="home-pg-note-ellipsis-div">
                <h1 className="h1-titles">Notes</h1>
                <div className="home-page-note-ellipsis-container">
                    <button onClick={createNewNote} className='home-page-new-note-container'>
                        <i className="fa-solid fa-file-lines"></i>
                    </button>
                    <button className='home-pg-ellipsis-btn' onClick={() => setShowMenu(!showMenu)}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <div className="home-page-note-drop-down-container">
                        {showMenu && (
                            <div className="home-page-note-drop-down-div">
                                <NavLink to={'/notes'} className={'go-to-notes'}>Go to notes</NavLink>
                                <NavLink to={'/notes/'} onClick={createNewNote} className={'create-new-note-drop-down'} >Create new note</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="home-notes-container">
                {notesArr?.reverse().map(note => (
                    <NavLink className={'note-div'} key={note.id} to={`/notes/note/${note.id}`}>
                        {/* <div className=""> */}
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-content" dangerouslySetInnerHTML={{__html: note.content}}></p>
                            <p className="home-note-updated-at">{toDate(note?.updatedAt)}</p>
                        {/* </div> */}
                    </NavLink>
                ))}
            </div>
        </div>
    )
};

export default HomeNotesView;
