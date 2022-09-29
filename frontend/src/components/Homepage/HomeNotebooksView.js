import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Homepage.css'
import { useState } from "react";
import { addScratch, editScratch, loadScratches, removeScratch } from "../../store/scratchpad";
import { useEffect } from "react";

const HomeNotebooksView = ({ scratches }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const scratchArr = scratches ? Object.values(scratches) : null;

    console.log(scratchArr)

    const [ scratch, setScratch ] = useState('');
    const [ enterPressed, setEnterPressed ] = useState(false);

    // useEffect(() => {
    //     const payload = {
    //         scratch,
    //         userId: user.id
    //     }

    //     // dispatch(loadScratches(user?.id))
    //     dispatch(editScratch(payload));

    // }, [dispatch, scratch]);
    console.log('scratch', scratch)
    const newScratch = document.getElementById('new-scratch');
    newScratch?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setEnterPressed(true);
        }
    });

    newScratch?.addEventListener('keyup', async function(e) {
        
        if (e.key === 'Enter') {
            e.preventDefault();
          
            const payload = {
                scratch,
                userId: user.id
            }
            console.log('payload', payload)
            await dispatch(addScratch(payload));
            newScratch.value += "\n";
            setEnterPressed(false);
        }
    });
    return (
        <div className="home-view-notebooks-div">
            <div>
                <h1 className="h1-titles" id='homepage-notebook-h1'>Scratch Pad</h1>
            </div>
            <div className="home-notebooks-container">
                {/* {notebooksArr?.map(notebook => (
                    <NavLink
                        className={'notebook-title-list'}
                        key={notebook.id}
                        to={`/notebooks/notebook/${notebook.id}`}>
                            <h3 className="home-notebooks-title">{notebook.name}</h3>
                    </NavLink>
                ))} */}
                    <textarea
                        id='new-scratch'
                        placeholder="Start writing..."
                        cols={'10'}
                        rows={'25'}
                        value={scratch}
                        onChange={e => setScratch(e.target.value)}
                    >
                    </textarea>
            </div>
        </div>
    )
};

export default HomeNotebooksView;
