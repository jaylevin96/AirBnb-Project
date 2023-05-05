import { csrfFetch } from "./csrf"

const SETSESSION = "session/SETSESSION"
const REMOVESESSION = "session/REMOVESESSION"

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

//thunks
export const postSession = (body) => async dispatch => {

    const response = await csrfFetch('/api/session', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const data = await response.json()
        // console.log(data);
        dispatch(setSession(data))
    }

}



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
        default:
            return state
    }

}
