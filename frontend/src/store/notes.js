import { csrfFetch } from "./csrf";

const GET_NOTES = 'notes/GET_NOTES';
const GET_NOTE = 'notes/GET_NOTE'
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

const getNote = note => {
    return {
        type: GET_NOTE,
        note
    }
};

const getNotebookNotes = (notes) => ({
  type: GET_NOTES,
  notes
});

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
        return data;
    }
};

export const getNotebookNotesThunk = (notebookId) => async (dispatch) => {

    const res = await fetch(`/api/notebooks/${notebookId}/notes`);

    if (res.ok) {
      const data = await res.json();
      dispatch(getNotebookNotes(data));
    }
};

export const getOneNote = noteId => async (dispatch) => {
    const res = await csrfFetch(`apt/notes/${noteId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getNote(data));
        return data;
    }
};

export const createNoteThunk = (newNote) => async (dispatch) => {
    const res= await csrfFetch('/api/notes', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNote)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addNote(newNote));
        return data;
    }
};

export const editNoteThunk = (note) => async (dispatch) => {

    const res = await csrfFetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
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
        return res;
    }
};


// reducer

const initialState = {};

const notesReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_NOTES:
            // newState = { ...state };
            newState = {};
            action.notes.forEach(note => {
                newState[note.id] = note;
            });
            return newState;
        case GET_NOTE:
            newState = {};
            newState[action.noteId] = action.note;
            return newState;
        case ADD_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        case EDIT_NOTE:
            // newState = { ...state };
            // newState[action.note.id] = action.note;
            // return newState;
            return { ...state, notes: action.note};
        case DELETE_NOTE:
            newState = { ...state };
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notesReducer;
