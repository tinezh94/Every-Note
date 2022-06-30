import { NavLink } from "react-router-dom";
import './Homepage.css'

const HomeNotesView = ({ notes }) => {
    //  console.log(notes)
    const notesArr = Object.values(notes);

    return (
        <>
            <div>
                <h1 className="h1-titles">Notes</h1>
            </div>
            <div className="home-notes-container">
                {notesArr?.map(note => (
                    <NavLink className={'note-div'} key={note.id} to={`/notebooks/notebook/${note.notebookId}`}>
                        <h3 className="note-title">{note.title}</h3>
                        <p className="note-content">{note.content}</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
};

export default HomeNotesView;
