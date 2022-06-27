import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import notebooksReducer from '../../store/noteboooks';
import { getNotebooksThunk } from '../../store/noteboooks';

const NotebookForm = () => {
    const userId = useParams();
    const [ name, setName ] = useState('');
    const [ notebooks, setNotebooks ] = useState([]);

    const dispatch = useDispatch();
    const notebooksSelector = useSelector(state => state.notebooksReducer);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('test')
    };

    const onDelete = async (e) => {
        e.preventDefault();
        console.log('test delete');
    }
    useEffect(() => {
        dispatch(getNotebooksThunk(`${userId}`));
    },[dispatch]);

    useEffect(() => {
        if (notebooksSelector) {
            setNotebooks(Object.value(notebooksSelector));
        }
    }, [notebooksSelector]);
};

return (
    <>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Create Notebook</button>
      </form>
      {notebooks && notebooks.map(notebook => (
        <div key={notebook.id}>
            <h4>Notebook Id: {notebook.id}</h4>
            <h4>Notebook Name: {notebook.name}</h4>
            <button onClick={() => onDelete(notebook.id)}>Delete Notebook</button>
        </div>
      ))}
    </>
)

export default NotebookForm;
