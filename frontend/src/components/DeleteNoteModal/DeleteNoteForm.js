import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteNoteThunk, getNotesThunk } from '../../store/notes';
import { getNotebookNotesThunk } from '../../store/notes';
const DeleteNote = ({ note, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!id) dispatch(getNotesThunk(sessionUser.id));
        else dispatch(getNotebookNotesThunk(id));
    }, [dispatch]);

    const onDelete = async (e, noteId) => {
        e.preventDefault();
        console.log("This is deleted note:", note, noteId);
        await dispatch(deleteNoteThunk(noteId));
        hideForm();
        // history.push(`/notebooks/notebook/${id}`);
    };

    const onCancel = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <>
            <h3 className='delete-note-h3'> Delete Note ?</h3>
            <p className='confirm-delete'>Delete will be permanent and cannot be undone!</p>
            <div className='delete-note-actions-div'>
                <button className='confirm-delete-note-btn' type='button' onClick={(e) => onDelete(e, note.id)}>Delete permanently</button>
                <button className='cancel-delete-btn' type='button' onClick={onCancel}>Cancel Delete</button>
            </div>
        </>
    )
};

export default DeleteNote;
