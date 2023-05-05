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
    console.log("DATA", data);
    dispatch(loadSpots(data))

}

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GETSPOTS:
            console.log("DATA2", action.data);
            newState = Object.assign({}, state)
            let spots = action.data.Spots.forEach((spot) => {
                newState[spot.id] = spot;
            });
            return newState;



        default:
            return state;
    }
}
