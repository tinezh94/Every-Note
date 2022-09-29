import { csrfFetch } from "./csrf";

const GET_SCRATCHES = 'scratches/GET_SCRATCHES';
const CREATE_SCRATCH = 'scratches/CREATE_SCRATCH';
const UPDATE_SCRATCH = 'scratches/UPDATE_SCRATCH';
const DELETE_SCRATCH = 'scratches/DELETE_SCRATCH';


const getScratches = scratches => {
    return {
        type: GET_SCRATCHES,
        scratches
    }
};

const createScratch = scratch => {
    return {
        type: CREATE_SCRATCH,
        scratch
    }
};

const updateScratch = scratch => {
    return {
        type: UPDATE_SCRATCH,
        scratch
    }
};

const deleteScratch = scratchId => {
    return {
        type: DELETE_SCRATCH,
        scratchId
    }
};

export const loadScratches = (userId) => async (dispatch) => {
    const res = await fetch(`/api/scratches/user/${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getScratches(data));
        return data;
    }
};

export const addScratch = (scratch) => async (dispatch) => {
    console.log('payload in thunk', scratch)
    const res = await csrfFetch('/api/scratches', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(scratch)
    })

    if (res.ok) {
        const data = await res.json();
        console.log('res.ok', data)
        dispatch(createScratch);
        return data;
    }
};

export const editScratch = (scratch) => async (dispatch) => {
    const res = await csrfFetch(`/api/scratches/${scratch.userId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(scratch)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(updateScratch);
        return data;
    }
};

export const removeScratch = (scratchId) => async (dispatch) => {
    const res = await csrfFetch(`/api/scratches/${scratchId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteScratch(data));
    }
};

const initialState = {};

const scratchesReducer = (state=initialState, action) => {
    let newState;

    switch(action.type) {
        case GET_SCRATCHES:
            newState = {};
            action.scratches.forEach(scratch => {
                newState[scratch.id] = scratch;
            });
            return newState;
        case CREATE_SCRATCH:
            newState = { ...state };
            newState[action.scratch.id] = action.scratch;
            return newState;
        case UPDATE_SCRATCH:
            newState = { ...state };
            newState[action.scratch.id] = action.scratch;
            return newState;
        case DELETE_SCRATCH:
            newState = { ...state };
            delete newState[action.scratchId];
            return newState;
        default:
            return state;
    }
};

export default scratchesReducer;