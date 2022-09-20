import { NavLink } from "react-router-dom";
import './Homepage.css'

const HomeNotebooksView = ({ notebooks }) => {
    const notebooksArr = Object.values(notebooks);

    return (
        <>
            <div>
                <h1 className="h1-titles" id='homepage-notebook-h1'>Notebooks</h1>
            </div>
            <div className="home-notebooks-container">
                {notebooksArr?.map(notebook => (
                    <NavLink
                        className={'notebook-title-list'}
                        key={notebook.id}
                        to={`/notebooks/notebook/${notebook.id}`}>
                            <h3 className="home-notebooks-title">{notebook.name}</h3>
                    </NavLink>
                ))}
            </div>
        </>
    )
};

export default HomeNotebooksView;
