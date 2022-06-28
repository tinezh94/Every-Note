import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createNoteThunk } from '../../store/notes';
import TextEditor from './richTextEditor';

const AddNewNote = () => {
    const [ newTitle, setNewTitle ] = useState('');
    const [ oldTitle, setOldTitle ] = useState('')
    const [ newContent, setNewContent ] = useState('');
    const [ oldContent, setOldContent ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ newNote, setNewNote ] = useState(true);

    const sessionUser = useSelector(state => state.session.user)
    const onSubmit = (e) => {
        e.preventDefault();

        if (newNote) {
            const payload = {
                title: newTitle,
                content: newContent,
                userId: sessionUser.id,
                // notebookId:
            }
        }
    }

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                    type="text"
                    value={newTitle ? newTitle : oldTitle}
                    onChange={newNote ? (e) => setNewTitle(e.target.value) : (e) => setOldTitle(e.target.value)}
                    />
                </form>
                <TextEditor newNote={newNote} />
            </div>
        </>
    )
};

export default AddNewNote;
