import { NavLink } from "react-router-dom";
import './Homepage.css'

const HomeNotesView = ({ notes }) => {
    //  console.log(notes)
    const notesArr = Object.values(notes);

    const toDate = (string) => {
        const date = new Date(string)
        const date1 = date.toDateString().split(' ')
        return date1.slice(1,3).join(' ');
    }

    return (
        <div className="home-view-notes-div">
            <div>
                <h1 className="h1-titles">Notes</h1>
            </div>
            <div className="home-notes-container">
                {notesArr?.map(note => (
                    <NavLink className={'note-div'} key={note.id} to={`/notebooks/notebook/${note.notebookId}`}>
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
