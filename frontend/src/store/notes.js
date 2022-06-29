import { csrfFetch } from "./csrf";

const GET_NOTES = 'notes/GET_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

//action creators

const getNotes = notes => {
    return {
        type: GET_NOTES,
        notes
    }
};

const addNote = note => {
    return {
        type: ADD_NOTE,
        note
    }
};

const editNote = note => {
    return {
        type: EDIT_NOTE,
        note
    }
};

const deleteNote = noteId => {
    return {
        type: DELETE_NOTE,
        noteId
    }
};

//thunk action creators

export const getNotesThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/user/${userId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getNotes(data));
    }
};

export const createNoteThunk = (newNote) => async (dispatch) => {
    const res= await csrfFetch(`/api/notes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNote)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addNote(newNote));
    }
};

export const editNoteThunk = (note) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/note/${note.id}`, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(note)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(editNote(data));
    }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notes/note/${noteId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteNote(data));
    }
};


// reducer

const initialState = {};

const notesReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_NOTES:
            action.notes.forEach(note => {
                newState[note.id] = note;
            });
            return newState;
        case ADD_NOTE:
            newState.note = action.note;
            return newState;
        case EDIT_NOTE:
            newState.note = action.note;
            return newState;
        case DELETE_NOTE:
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notesReducer;
