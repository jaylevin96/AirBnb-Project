import { csrfFetch } from "./csrf";

const GETSPOTS = '/spots/GETSPOTS'

export function loadSpots(data) {
    return {
        type: GETSPOTS,
        data
    }
}




export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json()

    dispatch(loadSpots(data))
    return data;

}

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTS:

            newState = Object.assign({}, state)
            let spots = action.data.Spots.forEach((spot) => {
                newState[spot.id] = spot;
            });
            return newState;



        default:
            return state;
    }
}
