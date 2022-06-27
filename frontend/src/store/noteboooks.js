import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';

//action creators
const getNotebooks = notebooks => {
    type: GET_NOTEBOOKS,
    notebooks
};

const createNotebook = notebook => {
    type: CREATE_NOTEBOOK,
    notebook
};

const updateNotebook = notebook => {
    type: UPDATE_NOTEBOOK,
    notebook
};

const deleteNotebook = notebookId => {
    type: DELETE_NOTEBOOK,
    notebookId
};

//thunk action creators
export const getNotebooksThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks/user/${userId}`);

    if (res.ok) {
        const data = res.json();
        dispatch(getNotebooks(data));
        return res;
    }
};

// const createNotebookThunk = user


//reducer
const notebooksReducer = (state= {}, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            newState = {};
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            });
            return {
                ...state,
                ...newState
            }
        case CREATE_NOTEBOOK:
            newState = { ...state};
            newState.user = action.payload;
            return newState;
        case UPDATE_NOTEBOOK:
            newState = { ...state};
            newState.user = action.payload;
            return newState;
        case DELETE_NOTEBOOK:
            const newState = { ...state };
            delete newState[action.notebookId];
            return newState;
        default:
            return state;
    }
};

export default notebooksReducer;
