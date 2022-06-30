import { NavLink } from "react-router-dom";

const HomeNotesView = ({ notes }) => {
    //  console.log(notes)
    const notesArr = Object.values(notes);

    return (
        <>
            <div>
                <h1>Notes</h1>
            </div>
            <div>
                {notesArr?.map(note => (
                    <NavLink key={note.id} to={`/notebooks/notebook/${note.notebookId}`}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </NavLink>
                ))}
            </div>
        </>
    )
};

export default HomeNotesView;
