import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteNoteThunk, getNotesThunk } from '../../store/notes';

const DeleteNote = ({ note, hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const notes = useSelector(state => state.notes);

    useEffect(() => {
        dispatch(getNotesThunk(id));
    }, [dispatch, notes, history]);

    const onDelete = (e, noteId) => {
        e.preventDefault();
        console.log(note);
        dispatch(deleteNoteThunk(noteId));
        hideForm();
        history.push(`/notebooks/notebook/${id}`);
    };

    const onCancel = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <>
            <h3> Delete Note ?</h3>
            <p>Delete will be permanent and cannot be undone</p>
            <button type='button' onClick={(e) => onDelete(e, note.id)}>Delete permanently</button>
            <button type='button' onClick={onCancel}>Cancel Delete</button>
        </>
    )
};

export default DeleteNote;