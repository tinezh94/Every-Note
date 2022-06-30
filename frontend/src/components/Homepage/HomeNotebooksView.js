import { NavLink } from "react-router-dom";

const HomeNoteooksView = ({ notebooks }) => {
    const notebooksArr = Object.values(notebooks);
    console.log(notebooksArr)
    return (
        <>
            <div>
                <h1>Notebooks</h1>
            </div>
            <div>
                {notebooksArr?.map(notebook => (
                    <NavLink
                        key={notebook.id}
                        to={`/notebooks/notebook/${notebook.id}`}>
                            <h3>{notebook.name}</h3>
                    </NavLink>
                ))}
            </div>
        </>
    )
};

export default HomeNoteooksView;
