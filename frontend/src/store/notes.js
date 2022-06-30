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
    console.log("IN GET NOTEBOOK NOTES", notebookId)
    const res = await fetch(`/api/notebooks/${notebookId}/notes`);

    console.log("IN GET NOTEBOOK NOTES after fetch", res)
    if (res.ok) {
      const data = await res.json();
      console.log("In res.ok, this is data", data)
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
    console.log("IN THUNK ACTION" ,newNote)
    const res= await csrfFetch('/api/notes', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNote)
    });

    console.log("IN THUNK AFTER FETCH", res)
    if (res.ok) {
        const data = await res.json();
        console.log("IN THUNK IF RES.OK", data)
        dispatch(addNote(newNote));
        return data;
    }
};

export const editNoteThunk = (note) => async (dispatch) => {
    console.log("INSIDE EDIT THUNK ROUTE", note);

    const res = await csrfFetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    console.log("IN THUNK AFTER FETCH", res)
    if (res.ok) {
        console.log("IN RES.OK", res)
        const data = await res.json();
        console.log("in thunk this is data", data)
        dispatch(editNote(data));
    }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
    console.log("DELETE NOTE THUNK", noteId);
    const res = await csrfFetch(`/api/notes/note/${noteId}`, {
        method: "DELETE"
    });
    console.log('DELETE THUNK AFTER FETCH', res);
    if (res.ok) {
        console.log('IN IF RES.OK')
        const data = await res.json();
        console.log("IN RES.OK, THIS IS DATA FROM BACKEND", data)
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
            console.log("IN REDUCER GET NOTES", action)
            // newState = { ...state };
            newState = {};
            console.log(action.notes)
            action.notes.forEach(note => {
                console.log(note)
                newState[note.id] = note;
            });
            return newState;
        case GET_NOTE:
            newState = {};
            newState[action.noteId] = action.note;
            return newState;
        case ADD_NOTE:
            console.log("REDUCER", action, action.note)
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        case EDIT_NOTE:
            console.log("IN EDIT REDUCER, THIS IS ACTION", action, action.note)
            // newState = { ...state };
            // newState[action.note.id] = action.note;
            // return newState;
            return { ...state, notes: action.note};
        case DELETE_NOTE:
            console.log("IN DELETE REDUCER, THIS IS ACTION", action, action.noteId)
            newState = { ...state };
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notesReducer;
