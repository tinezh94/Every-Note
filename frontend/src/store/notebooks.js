import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS';
// const GET_ONE_NOTEBOOK ='notebooks/GET_ONE_NOTEBOOK';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';

//action creators
const getNotebooks = notebooks => {
    return {
        type: GET_NOTEBOOKS,
        notebooks
    }
};

// const getOneNotebook = notebookId => {
//     return {
//         type: GET_ONE_NOTEBOOK,
//         notebookId
//     }
// };

const createNotebook = notebook => {
    return {
        type: CREATE_NOTEBOOK,
        notebook
    }
};

const updateNotebook = notebook => {
    return {
        type: UPDATE_NOTEBOOK,
        notebook
    }
};

const deleteNotebook = notebookId => {
    return {
        type: DELETE_NOTEBOOK,
        notebookId
    }
};

//thunk action creators
export const getNotebooksThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/user/${userId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getNotebooks(data));
        return res;
    }
};

// export const getOneNotebookThunk = (notebookId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/notebooks/${notebookId}`);
//     console.log(notebookId)

//     if (res.ok) {
//         const data= await res.json();
//         console.log(data)
//         dispatch(getOneNotebook(data));
//         return data;
//     }
// }

export const createNotebookThunk = (newNotebook) => async (dispatch) => {
    const res = await csrfFetch('/api/notebooks', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNotebook)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createNotebook(data));
        return data;
    }
}

export const updateNotebookThunk = (notebook) => async (dispatch) => {
    const res = await csrfFetch( `/api/notebooks/${notebook.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(notebook)
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(updateNotebook(data));
        return data;
    }
}

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
    const res = await csrfFetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteNotebook(data));
        return res;
    }
}

const initialState = {};

//reducer
const notebooksReducer = (state= initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_NOTEBOOKS:
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            });
            return newState;
        // case GET_ONE_NOTEBOOK:
        //     newState[action.payload.id] = action.payload;
        //     return newState;
        case CREATE_NOTEBOOK:
            newState.notebook = action.payload;
            return newState;
        case UPDATE_NOTEBOOK:
            newState.notebook = action.payload;
            return newState;
        case DELETE_NOTEBOOK:
            delete newState[action.notebookId];
            return newState;
        default:
            return state;
    }
};

export default notebooksReducer;
