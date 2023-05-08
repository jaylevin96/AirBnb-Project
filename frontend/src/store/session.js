import { csrfFetch } from "./csrf"

const SETSESSION = "session/SETSESSION"
const REMOVESESSION = "session/REMOVESESSION"
const GETSESSION = 'session/GETSESSION'

export function setSession(payload) {
    return {
        type: SETSESSION,
        payload
    }
}

export function removeSession() {
    return {
        type: REMOVESESSION
    }
}
export function getSession(payload) {
    return {
        type: GETSESSION,
        payload
    }
}

//thunks
export const postSession = (body) => async dispatch => {

    const response = await csrfFetch('/api/session', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    const data = await response.json()
    // console.log(data);
    dispatch(setSession(data))


}
export const createUser = (body) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    dispatch(setSession(data))
}

export const getSessionThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session')
    const data = await response.json();
    dispatch(getSession(data))
}

export const removeSessionThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: "DELETE"
    })
    const data = await response.json();
    dispatch(removeSession(data));
}



//reducer

const initialState = { user: null }

export function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SETSESSION:
            // console.log("PAYLOAD", action.payload.user);
            return { ...state, user: action.payload.user }
        case REMOVESESSION:
            newState = Object.assign({}, state)
            newState.user = null;
            return newState;
        case GETSESSION:
            newState = Object.assign({}, state)
            newState.user = action.payload.user
            return newState;
        default:
            return state
    }

}
